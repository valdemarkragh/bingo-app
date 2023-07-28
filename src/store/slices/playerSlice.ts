import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlayer } from "../../types";

interface IPlayerState {
    playerId: null | string;
    playerMetaData: IPlayer | null;
    playerDocId: string | null;
}

const initialState: IPlayerState = {
    playerId: localStorage.getItem("playerId"),
    playerMetaData: null,
    playerDocId: null,
};

export const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        setPlayerId: (state, action: PayloadAction<null | string>) => {
            if (action.payload) {
                localStorage.setItem("playerId", action.payload);
            } else {
                localStorage.removeItem("playerId");
            }

            state.playerId = action.payload;
        },
        setPlayerMetaData: (state, action: PayloadAction<IPlayer | null>) => {
            state.playerMetaData = action.payload;
        },
        setPlayerDocId: (state, action: PayloadAction<string | null>) => {
            state.playerDocId = action.payload;
        },
        clearPlayerData: (state) => {
            state.playerId = null;
            state.playerMetaData = null;
            state.playerDocId = null;
            localStorage.removeItem("playerId");
        },
    },
});

export const { setPlayerId, setPlayerMetaData, setPlayerDocId, clearPlayerData } = playerSlice.actions;
export default playerSlice.reducer;
