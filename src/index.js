import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {store} from './store';
import App from './components/App';
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import {createFirestoreInstance} from "redux-firestore";
import firebase from './config/firebaseConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

const rrfProps = {
    firebase,
    config: {
        useFirestoreForProfile: true,
        userProfile: "users",
    },
    dispatch: store.dispatch,
    createFirestoreInstance
}

const Index = () => (
    <Provider store = {store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>
);

ReactDOM.render(<Index />, document.getElementById("root"));
