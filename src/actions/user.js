import * as Actions from "../constants/actions"

/***
 *
 * @param game - Game object to be added to firestore collection
 * @returns {function(*, *, {getFirebase: *, getFirestore: *}): Promise<unknown>}
 */
export const addGame = (game) => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {
        dispatch({type: Actions.ADD_GAME_BEGIN});

        const firestore = getFirestore();
        const currentUserUID = getState().firebase.auth.uid;

        const UserDataRef = firestore.collection('data').doc(currentUserUID);
        UserDataRef.collection('games').doc(game.id.toString()).set(game).then(() => {
            dispatch({type: Actions.ADD_GAME_SUCCESS});
            resolve();
        }).catch((error) => {
            dispatch({type: Actions.ADD_GAME_ERROR, error: error});
            reject(error);
        });
    });
}

export const test = (newUserCredentials) => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {

        console.log("ran!");
    });
}