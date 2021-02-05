import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import About from "./About";
import VideoGamePage from "./VideoGamePage";
import Signup from "./Signup";
import Login from "./Login";
import "../styles/app.css"

const mapStateToProps = (state) => {
    return {};
}

class App extends Component {

    render() {
        return(
            <div className="app">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/about' component={About} />
                        <Route path= "/games/:game_id" component={VideoGamePage} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/login' component={Login} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}



export default connect(mapStateToProps)(App);