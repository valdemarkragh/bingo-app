import { combineReducers } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import playerReducer from "./slices/playerSlice";

export default combineReducers({
    game: gameReducer,
    player: playerReducer,
});
