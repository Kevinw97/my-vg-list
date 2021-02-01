import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import About from "./About";
import VideoGamePage from "./VideoGamePage";
import "../styles/app.css"

class App extends React.Component {

    render() {
        return(
            <div className="app">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/about' component={About} />
                        <Route path= "/games/:game_id" component={VideoGamePage} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(App);