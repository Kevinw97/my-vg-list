import * as Actions from "../constants/actions";

export const test = (newUserCredentials) => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        console.log("ran!");

        firestore.get("users/mLKE5zLKn9NjMMs16jVbiPMTV1n1")
    });
}