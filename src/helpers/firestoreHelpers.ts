import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { IPlayer, IGame, IPlayerWinner } from "../types";
import { generateRandomNumber } from "./bingoPlateHelpers";

const firestoreResponse = <T>(data: any, docId: string) => {
    const res: { data: T; docId: string } = {
        data,
        docId,
    };

    return res;
};

export const getGame = async (key: string) => {
    const gameQuery = query(collection(db, "games"), where("key", "==", key));
    const querySnapshot = await getDocs(gameQuery);

    if (querySnapshot.empty) {
        return null;
    }

    return firestoreResponse<IGame>(querySnapshot.docs[0].data(), querySnapshot.docs[0].id);
};

export const createGame = async (data: IGame) => {
    const gamesDoc = doc(collection(db, "games"));

    await setDoc(gamesDoc, data);
};

export const addPlayerToGame = async (player: IPlayer, key: string) => {
    const game = await getGame(key);

    if (!game) return null;

    await updateDoc(doc(db, "games", game.docId), {
        currentPlayers: [...game.data.currentPlayers, player],
    });
};

export const removePlayerFromGame = async (username: string, key: string) => {
    const game = await getGame(key);

    if (!game) return null;

    const players = game.data.currentPlayers.filter((player) => player.username !== username);

    await updateDoc(doc(db, "games", game.docId), {
        currentPlayers: players,
    });
};

export const addPlayer = async (data: IPlayer) => {
    const playersDoc = doc(collection(db, "players"));

    await setDoc(playersDoc, data);
    await addPlayerToGame(data, data.key);
};

export const getPlayer = async (username: string, key: string) => {
    const playerQuery = query(collection(db, "players"), where("username", "==", username), where("key", "==", key));
    const querySnapshot = await getDocs(playerQuery);

    if (querySnapshot.empty) {
        return null;
    }

    return firestoreResponse<IPlayer>(querySnapshot.docs[0].data(), querySnapshot.docs[0].id);
};

export const getGameQuery = (key: string) => {
    const gameCollection = collection(db, "games");
    return query(gameCollection, where("key", "==", key));
};

export const getPlayerQuery = (username: string) => {
    const playerCollection = collection(db, "players");
    return query(playerCollection, where("username", "==", username));
};

export const updatePickedNumbers = async (alreadyPickedNumbers: number[], docId: string) => {
    await updateDoc(doc(db, "games", docId), {
        pickedNumbers: [...alreadyPickedNumbers, generateRandomNumber(alreadyPickedNumbers)],
    });
};

export const updateNumberModalOpen = async (isOpen: boolean, docId: string) => {
    await updateDoc(doc(db, "games", docId), {
        numberModalOpen: isOpen,
    });
};

export const finishGame = async (docId: string) => {
    await updateDoc(doc(db, "games", docId), {
        ended: true,
    });
};

export const startGame = async (docId: string) => {
    await updateDoc(doc(db, "games", docId), {
        started: true,
    });
};

export const updateWinners = async (docId: string, winner: IPlayerWinner, prevWinners: IPlayerWinner[], rowsDone: number) => {
    console.log(docId, winner, prevWinners, rowsDone);
    await updateDoc(doc(db, "games", docId), {
        winners: [...prevWinners, winner],
        rowsDone,
    });
};

export const updateWinnerModalOpen = async (isOpen: boolean, docId: string) => {
    await updateDoc(doc(db, "games", docId), {
        winnerModalOpen: isOpen,
    });
};
