import {combineReducers} from "redux";
import {gamesReducer, gameReducer} from "./reducers/gamesReducer";
import {authReducer} from "./reducers/authReducer";
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase";
import {userReducer} from "./reducers/userReducer";

export default combineReducers({
    currentGame: gameReducer,
    games: gamesReducer,
    auth: authReducer,
    user: userReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});
