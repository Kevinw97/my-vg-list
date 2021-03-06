import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";
import {addGame} from "../actions/user";
import {compose} from "redux";
import _ from 'lodash';
import "../styles/games.scss"

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        myGames: state.firestore.data.myGames
    };
}

class GameListing extends Component {

    constructor(props) {
        super(props);
        this.addGameToUserList = this.addGameToUserList.bind(this);
        this.shouldDisableButton = this.shouldDisableButton.bind(this);
    }

    addGameToUserList(event) {
        event.preventDefault();

        const currentGame = this.props.game;
        const selectedPlatform = !_.isEmpty(currentGame.platforms) ? currentGame.platforms[0].platform.id : "";
        const gameObject = {
            id: currentGame.id,
            name: currentGame.name,
            background_image: currentGame.background_image,
            available_platforms: currentGame.platforms,
            selected_platform: selectedPlatform,
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
            <div className="game-listing">
                <NavLink to={"/games/" + this.props.game.id}>
                    <div className="game-image" style={{
                        backgroundImage: `url(${this.props.game.background_image})`
                    }}>
                    </div>
                </NavLink>
                <div className="game-listing-info">
                    <NavLink to={"/games/" + this.props.game.id}>
                        <h4> {this.props.game.name}</h4>
                    </NavLink>
                    <span>Platforms: {
                        !_.isEmpty(this.props.game.platforms) ?
                            this.props.game.platforms.map((platformObject) => platformObject.platform.name).join(", ") :
                            <span>N/A</span>
                    }</span>
                    <span>Metacritic score: {this.props.game.metacritic}</span>
                </div>
                <Button className="game-add-button" onClick={this.addGameToUserList} disabled={this.shouldDisableButton()}>Add to my list</Button>

            </div>
        )
    }
}

export default compose(
    connect(mapStateToProps)
)(GameListing);