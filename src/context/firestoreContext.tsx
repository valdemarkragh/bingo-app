import { createContext, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearPlayerData, setPlayerDocId, setPlayerId, setPlayerMetaData } from "../store/slices/playerSlice";
import { clearGameData, setGameDocId, setGameMetaData, setKey } from "../store/slices/gameSlice";
import { onSnapshot } from "firebase/firestore";
import {
    addPlayer,
    createGame,
    finishGame,
    getGame,
    getGameQuery,
    getPlayer,
    getPlayerQuery,
    kickPlayer,
    removePlayerFromGame,
    startGame,
    updateNumberModalOpen,
    updatePickedNumbers,
    updateWinnerModalOpen,
    updateWinners,
} from "../helpers/firestoreHelpers";
import { useNavigate } from "react-router-dom";
import { IGame, IPlayer } from "../types";
import { generateBingoPlate, isRowCompleted, parseBingoPlate } from "../helpers/bingoPlateHelpers";
import { generateGUID, generateGameKey } from "../helpers";
import { JoinGameForm } from "../components/Forms/JoinGameForm";
import { NewGameForm } from "../components/Forms/NewGameForm";

interface IGameWrapper {
    key: string | null;
    data: IGame | null;
    docId: string | null;
}

interface IPlayerWrapper {
    playerId: string | null;
    data: IPlayer | null;
    docId: string | null;
}

interface IFirestoreContext {
    game: IGameWrapper;
    player: IPlayerWrapper;
    clearStore: () => void;
    handleLeaveGame: () => Promise<void>;
    handleJoinGame: (formValues: JoinGameForm) => Promise<boolean | undefined>;
    handleCreateGame: (formValues: NewGameForm) => Promise<void>;
    handlePickNumber: () => Promise<void>;
    handleNumberModalClose: () => Promise<void>;
    handleKickPlayer: (playerId: string) => Promise<void>;
    handleStartGame: () => Promise<void>;
    handleWinnerModalClose: () => Promise<void>;
    bingoNumbers: number[];
}

const FirestoreContext = createContext<IFirestoreContext | null>(null!);

export const FirestoreProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { key, gameMetaData, gameDocId } = useAppSelector((state) => state.game);
    const { playerId, playerMetaData, playerDocId } = useAppSelector((state) => state.player);
    const bingoNumbers = Array.from({ length: 90 }, (_, index) => index + 1);

    useEffect(() => {
        if (!key || !playerId) {
            clearStore();
            return navigate("/");
        }

        (async () => {
            const game = await getGame(key);
            const player = await getPlayer(playerId, key);

            if (!player?.data || !game?.data) return navigate("/");

            dispatch(setGameDocId(game.docId));
            dispatch(setPlayerDocId(player.docId));

            onSnapshot(getGameQuery(key), (querySnapshot) => {
                if (querySnapshot.empty) {
                    clearStore();
                    return;
                }

                querySnapshot.forEach((doc) => {
                    const game = doc.data() as IGame;

                    if (game.ended) {
                        clearStore();
                        return;
                    }

                    dispatch(setGameMetaData(game));

                    if (game.started) {
                        handleRowsCompletion(game, player.data, doc.id);
                    }
                });
            });

            onSnapshot(getPlayerQuery(playerId, key), (querySnapshot) => {
                if (querySnapshot.empty) {
                    clearStore();
                    return;
                }

                querySnapshot.forEach((doc) => {
                    const player = doc.data() as IPlayer;

                    if (player.kicked) {
                        clearStore();
                        return;
                    }

                    dispatch(setPlayerMetaData(player));
                });
            });
        })();
    }, [key, playerId]);

    const clearStore = () => {
        dispatch(clearPlayerData());
        dispatch(clearGameData());
    };

    const handleRowsCompletion = async (game: IGame, player: IPlayer, gameDocId: string) => {
        const parsedBingoPlate = parseBingoPlate(player.bingoPlate);
        const rowOneComplete = isRowCompleted(game.pickedNumbers, parsedBingoPlate, 1);
        const rowTwoComplete = isRowCompleted(game.pickedNumbers, parsedBingoPlate, 2);
        const rowThreeComplete = isRowCompleted(game.pickedNumbers, parsedBingoPlate, 3);
        const rowCompletionStatus = [rowOneComplete, rowTwoComplete, rowThreeComplete];
        const numberOfTrueValues = rowCompletionStatus.filter((status) => status).length;

        if (numberOfTrueValues > game.rowsDone) {
            await updateWinners(gameDocId, { ...player, roundWon: game.rowsDone + 1 }, game.winners, game.rowsDone + 1);
            return await updateWinnerModalOpen(true, gameDocId!);
        }
    };

    const handleJoinGame = async ({ username, key }: JoinGameForm) => {
        const game = await getGame(key);
        const playerId = generateGUID();

        if (!game?.data) return false;

        await addPlayer({
            key,
            username,
            playerId,
            bingoPlate: JSON.stringify(generateBingoPlate()),
            isAdmin: false,
            kicked: false,
        });

        dispatch(setKey(key));
        dispatch(setPlayerId(playerId));

        navigate("/game");
    };

    const handleCreateGame = async ({ username, requiredPlayers }: NewGameForm) => {
        const key = generateGameKey();
        const playerId = generateGUID();

        await createGame({
            key,
            requiredPlayers,
            started: false,
            ended: false,
            pickedNumbers: [],
            currentPlayers: [],
            rowsDone: 0,
            numberModalOpen: false,
            winners: [],
            winnerModalOpen: false,
        });

        await addPlayer({
            key,
            playerId,
            username,
            bingoPlate: JSON.stringify(generateBingoPlate()),
            isAdmin: true,
            kicked: false,
        });

        dispatch(setKey(key));
        dispatch(setPlayerId(playerId));

        navigate("/game");
    };

    const handleLeaveGame = async () => {
        clearStore();

        if (playerMetaData?.isAdmin) {
            return await finishGame(gameDocId!);
        }

        await removePlayerFromGame(playerId!, key!);
    };

    const handleKickPlayer = async (playerId: string) => {
        await kickPlayer(playerId, gameMetaData!.key);
    };

    const handlePickNumber = async () => {
        await updatePickedNumbers(gameMetaData?.pickedNumbers ?? [], gameDocId!);
        await updateNumberModalOpen(true, gameDocId!);
    };

    const handleNumberModalClose = async () => {
        if (!playerMetaData?.isAdmin) return;

        await updateNumberModalOpen(false, gameDocId!);
    };

    const handleStartGame = async () => {
        await startGame(gameDocId!);
    };

    const handleWinnerModalClose = async () => {
        if (!playerMetaData?.isAdmin) return;

        if (gameMetaData?.rowsDone === 3) {
            await finishGame(gameDocId!);
        }

        await updateWinnerModalOpen(false, gameDocId!);
    };

    const value: IFirestoreContext = {
        clearStore,
        handleLeaveGame,
        handleJoinGame,
        handleCreateGame,
        handlePickNumber,
        handleNumberModalClose,
        handleKickPlayer,
        handleStartGame,
        handleWinnerModalClose,
        game: {
            data: gameMetaData,
            docId: gameDocId,
            key,
        },
        player: {
            data: playerMetaData,
            docId: playerDocId,
            playerId,
        },
        bingoNumbers,
    };

    return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};

export const useFirestoreContext = () => useContext(FirestoreContext)!;
