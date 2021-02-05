import {combineReducers} from "redux";
import {gamesReducer, gameReducer} from "./reducers/gamesReducer";
import {authReducer} from "./reducers/authReducer";
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase";

export default combineReducers({
    currentGame: gameReducer,
    games: gamesReducer,
    auth: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});
