import { combineReducers } from "redux";
import { gamesReducer } from "./reducers/gamesReducer";

export default combineReducers({
    games: gamesReducer
});
