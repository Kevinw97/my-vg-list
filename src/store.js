import {applyMiddleware, createStore, compose} from 'redux';
import thunk  from 'redux-thunk';
import reducer from './reducer';
import {composeWithDevTools} from "redux-devtools-extension";
import {reduxFirestore, getFirestore} from 'redux-firestore';
import {getFirebase} from 'react-redux-firebase';
import firebase from './config/firebaseConfig';

const extraArguments = {getFirebase, getFirestore};
const enhancer = composeWithDevTools(compose(
    applyMiddleware(thunk.withExtraArgument(extraArguments)),
    reduxFirestore(firebase)));


export const store = createStore(reducer, enhancer);
