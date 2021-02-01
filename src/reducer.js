import { combineReducers } from "redux";
import { gamesReducer, gameReducer } from "./reducers/gamesReducer";

export default combineReducers({
    currentGame: gameReducer,
    games: gamesReducer
});
