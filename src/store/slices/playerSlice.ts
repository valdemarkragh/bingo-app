import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlayer } from "../../types";

interface IPlayerState {
    username: null | string;
    playerMetaData: IPlayer | null;
    playerDocId: string | null;
}

const initialState: IPlayerState = {
    username: localStorage.getItem("username"),
    playerMetaData: null,
    playerDocId: null,
};

export const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<null | string>) => {
            if (action.payload) {
                localStorage.setItem("username", action.payload);
            } else {
                localStorage.removeItem("username");
            }

            state.username = action.payload;
        },
        setPlayerMetaData: (state, action: PayloadAction<IPlayer | null>) => {
            state.playerMetaData = action.payload;
        },
        setPlayerDocId: (state, action: PayloadAction<string | null>) => {
            state.playerDocId = action.payload;
        },
        clearPlayerData: (state) => {
            state.username = null;
            state.playerMetaData = null;
            state.playerDocId = null;
            localStorage.removeItem("username");
        },
    },
});

export const { setUsername, setPlayerMetaData, setPlayerDocId, clearPlayerData } = playerSlice.actions;
export default playerSlice.reducer;
