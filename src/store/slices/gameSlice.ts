import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGame } from "../../types";

interface IGameState {
    key: null | string;
    gameMetaData: IGame | null;
    gameDocId: string | null;
}

const initialState: IGameState = {
    key: localStorage.getItem("key"),
    gameMetaData: null,
    gameDocId: null,
};

export const gameSlice = createSlice({
    name: "game",
    initialState: initialState,
    reducers: {
        setKey: (state, action: PayloadAction<null | string>) => {
            if (action.payload) {
                localStorage.setItem("key", action.payload);
            } else {
                localStorage.removeItem("key");
            }

            state.key = action.payload;
        },
        setGameMetaData: (state, action: PayloadAction<IGame | null>) => {
            state.gameMetaData = action.payload;
        },
        setGameDocId: (state, action: PayloadAction<string | null>) => {
            state.gameDocId = action.payload;
        },
        clearGameData: (state) => {
            state.gameDocId = null;
            state.key = null;
            state.gameMetaData = null;
            localStorage.removeItem("key");
        },
    },
});

export const { setKey, setGameMetaData, setGameDocId, clearGameData } = gameSlice.actions;
export default gameSlice.reducer;
