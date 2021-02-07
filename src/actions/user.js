export const test = (newUserCredentials) => (dispatch, getState, {getFirebase, getFirestore}) => {
    return new Promise((resolve, reject) => {
        const firestore = getFirestore();

        console.log("ran!");
    });
}