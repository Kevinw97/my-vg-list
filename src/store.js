import {applyMiddleware, createStore, compose} from 'redux';
import thunk  from 'redux-thunk';
import reducer from './reducer';
import {composeWithDevTools} from "redux-devtools-extension";
import {reduxFirestore, getFirestore} from 'redux-firestore';
import {getFirebase} from 'react-redux-firebase';
import fbConfig from './config/firebaseConfig';

const extraArguments = {getFirestore, getFirebase};
const enhancer = composeWithDevTools(compose(
    applyMiddleware(thunk.withExtraArgument(extraArguments)),
    reduxFirestore(fbConfig)));


export const store = createStore(reducer, enhancer);
