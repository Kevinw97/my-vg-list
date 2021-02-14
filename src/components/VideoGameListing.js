import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../styles/games.css"
import {NavLink} from "react-router-dom";
import _ from 'lodash';
import {Button} from "react-bootstrap";
import {addGame} from "../actions/user";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        myGames: state.firestore.data.myGames
    };
}

class VideoGameListing extends Component {

    constructor(props) {
        super(props);
        this.addGameToUserList = this.addGameToUserList.bind(this);
        this.shouldDisableButton = this.shouldDisableButton.bind(this);
    }

    addGameToUserList(event) {
        event.preventDefault();

        const currentGame = this.props.game;
        const gameObject = {
            id: currentGame.id,
            name: currentGame.name,
            background_image: currentGame.background_image,
            available_platforms: currentGame.platforms,
            selected_platform: "",
            status: "",
            playtime: 0,
            rating: 0,
            favorite: false,
        }

        this.props.dispatch(addGame(gameObject));
    }

    shouldDisableButton() {
        if (this.props.myGames) {
            const gameId = this.props.game.id;

            return this.props.myGames[gameId];
        }

        return !this.props.auth.uid;
    }

    render() {
        return(
            <div className="videoGameListing">
                <NavLink to={"/games/" + this.props.game.id}>
                    <div className="videoGameImage" style={{
                        backgroundImage: `url(${this.props.game.background_image})`
                    }}>
                    </div>
                </NavLink>
                <Button onClick={this.addGameToUserList} disabled={this.shouldDisableButton()}>+</Button><span> {this.props.game.name}</span>
                <br/>
                <span>Platforms: {
                    !_.isEmpty(this.props.game.platforms) ?
                        this.props.game.platforms.map((platformObject) => platformObject.platform.name).join(", ") :
                        <span>N/A</span>
                }</span>
                <br/>
                <span>Metacritic score: {this.props.game.metacritic}</span>
            </div>
        )
    }
}

export default compose(
    connect(mapStateToProps)
)(VideoGameListing);