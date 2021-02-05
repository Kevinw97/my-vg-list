import * as Actions from "../constants/actions"

export const signIn = (credentials) => (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch({type: Actions.LOGIN_BEGIN});

    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
    ).then(() => {
        dispatch({type: Actions.LOGIN_SUCCESS});
    }).catch((error) => {
        dispatch({type: Actions.LOGIN_ERROR, error});
    });
}

export const signOut = () => (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch({type: Actions.SIGNOUT_BEGIN});

    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
        dispatch({type: Actions.SIGNOUT_SUCCESS});
    }).catch((error) => {
        dispatch({type: Actions.SIGNOUT_ERROR});
    });
}