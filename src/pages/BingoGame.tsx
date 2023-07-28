import { Fragment, useEffect } from "react";
import { BingoPlate } from "../components/BingoPlate/BingoPlate";
import { useNavigate } from "react-router-dom";
import { getGame, getGameQuery, getPlayer, updateWinnerModalOpen, updateWinners } from "../helpers/firestoreHelpers";
import { onSnapshot } from "firebase/firestore";
import { clearGameData, setGameDocId, setGameMetaData } from "../store/slices/gameSlice";
import { IGame, IPlayer } from "../types";
import { clearPlayerData, setPlayerDocId, setPlayerMetaData } from "../store/slices/playerSlice";
import { MissingPlayers } from "../components/MissingPlayers";
import { Container, VStack } from "@chakra-ui/react";
import { Loader } from "../components/Loader";
import { NewNumberBtn } from "../components/NewNumberBtn";
import { NewNumberModal } from "../components/NewNumberModal";
import { Players } from "../components/Players";
import { isRowCompleted, parseBingoPlate } from "../helpers/bingoPlateHelpers";
import { WinnerModal } from "../components/WinnerModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const BingoGame = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { key, gameMetaData } = useAppSelector((state) => state.game);
    const { username, playerMetaData } = useAppSelector((state) => state.player);

    useEffect(() => {
        if (!key || !username) return navigate("/");

        (async () => {
            const game = await getGame(key);
            const player = await getPlayer(username, key);

            if (!player?.data || !game?.data) return navigate("/");

            dispatch(setGameDocId(game.docId));
            dispatch(setPlayerDocId(player.docId));
            dispatch(setPlayerMetaData(player.data));

            onSnapshot(getGameQuery(key), (querySnapshot) => {
                if (querySnapshot.empty) {
                    dispatch(clearPlayerData());
                    dispatch(clearGameData());
                    return;
                }

                querySnapshot.forEach((doc) => {
                    const game = doc.data() as IGame;
                    dispatch(setGameMetaData(game));

                    if (game.ended) {
                        dispatch(clearPlayerData());
                        dispatch(clearGameData());
                        return;
                    }

                    handleRowsCompletion(game, player.data, doc.id);
                });
            });
        })();
    }, [key, username]);

    const handleRowsCompletion = async (game: IGame, player: IPlayer, gameDocId: string) => {
        if (!game.started) return;

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

    if (!gameMetaData || !playerMetaData) return <Loader />;

    if (gameMetaData?.requiredPlayers > gameMetaData?.currentPlayers.length) return <MissingPlayers />;

    return (
        <Fragment>
            <Container position='relative' height='100%' maxW='xxl' pt={5}>
                <NewNumberBtn />
                <VStack pt={5} spacing={5} alignItems='start'>
                    <Players />
                    <BingoPlate bingoPlate={playerMetaData.bingoPlate} />
                </VStack>
            </Container>
            <WinnerModal />
            <NewNumberModal />
        </Fragment>
    );
};
