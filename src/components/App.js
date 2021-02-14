import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Home from "./Home";
import Header from "./Header";
import About from "./About";
import VideoGamePage from "./VideoGamePage";
import Signup from "./Signup";
import Login from "./Login";
import UserVideoGameListing from "./UserVideoGamesTable";
import "../styles/app.css"


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
}

class App extends Component {

    render() {
        return(
            <div className="app">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/mylist' component={UserVideoGameListing} />
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
            if (isLoaded(props.auth) && props.auth.uid) {
                return [{
                    collection: "users",
                    doc: props.auth.uid,
                    storeAs: "user"
                }, {
                    collection: "data",
                    doc: props.auth.uid,
                    subcollections: [{
                        collection: 'games'
                    }],
                    storeAs: "myGames",
                    orderBy: ["name"]
                }]
            }
            return []
        }
    )
)(App);