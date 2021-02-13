import * as Actions from "../constants/actions"

/*
Action creators for updating user data and information
 */

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

/***
 * dirtyGames structure:
 * {
 *     gameKey: (object with fields and datas that changed)
 * }
 * @returns {function(*=, *, {getFirebase: *, getFirestore: *}): Promise<unknown>}
 */
export const updateGames = () => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {
        dispatch({type: Actions.UPDATE_GAMES_BEGIN});

        const firestore = getFirestore();
        const currentUserUID = getState().firebase.auth.uid;

        const state = getState();

        const dirtyGames = state.user.dirtyGames;
        const dirtyGameIds = Object.keys(dirtyGames);

        Promise.all(dirtyGameIds.map(gameId => {
            const UserDataRef = firestore.collection('data').doc(currentUserUID);
            return UserDataRef.collection('games').doc(gameId).update(dirtyGames[gameId]);
        })).then(() => {
            dispatch({type: Actions.UPDATE_GAMES_SUCCESS});
            resolve();
        }).catch((error) => {
            dispatch({type: Actions.UPDATE_GAMES_ERROR, error: error});
            reject(error);
        });
    });
}

export const removeGame = (gameId) => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {
        dispatch({type: Actions.DELETE_GAME_BEGIN});

        const firestore = getFirestore();
        const currentUserUID = getState().firebase.auth.uid;

        const UserDataRef = firestore.collection('data').doc(currentUserUID);
        UserDataRef.collection('games').doc(gameId.toString()).delete().then(() => {
            dispatch({type: Actions.DELETE_GAME_SUCCESS, payload: gameId});
            resolve();
        }).catch((error) => {
            dispatch({type: Actions.DELETE_GAME_ERROR});
            reject(error);
        });
    });
}

export const addDirtyGame = (game) => {
    return {
        type: Actions.ADD_DIRTY_GAME,
        payload: game
    }
}

export const clearDirtyGames = () => {
    return {
        type: Actions.CLEAR_DIRTY_GAMES
    }
}