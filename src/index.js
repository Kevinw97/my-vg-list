import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App'

const Index = () => (
    <Provider store = {store}>
        <App />
    </Provider>
);


ReactDOM.render(<Index />, document.getElementById("root"));