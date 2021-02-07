import * as Actions from "../constants/actions"

export const signIn = (credentials) => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {
        dispatch({type: Actions.LOGIN_BEGIN});

        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: Actions.LOGIN_SUCCESS});
            resolve();
        }).catch((error) => {
            dispatch({type: Actions.LOGIN_ERROR, error});
            reject(error);
        });
    });
}

export const signOut = () => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {
        dispatch({type: Actions.SIGNOUT_BEGIN});

        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: Actions.SIGNOUT_SUCCESS});
            resolve();
        }).catch((error) => {
            dispatch({type: Actions.SIGNOUT_ERROR, error});
            reject();
        });
    });
}

export const signUp = (newUserCredentials) => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {
        dispatch({type: Actions.SIGNUP_BEGIN});

        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUserCredentials.email,
            newUserCredentials.password
        ).then((response) => {
            try {
                firestore.collection('users').doc(response.user.uid).set({
                    username: newUserCredentials.username
                });
                firestore.collection('data').doc(response.user.uid).set({})
            } catch(error) {
                console.log(error);
            }

        }).then(() => {
            dispatch({type: Actions.SIGNUP_SUCCESS});
            resolve();
        }).catch((error) => {
            dispatch({type: Actions.SIGNUP_ERROR, error});
            reject();
        });
    });
}