import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import UserVideoGameListing from "./UserVideoGameListing";
import "../styles/userGames.css";


function mapStateToProps(state) {
    return {
        auth: state.firebase.auth,
        myGames: state.firestore.data.myGames
    };
}

class UserVideoGamesContainer extends Component {
    userVideoGameListing() {
        if (this.props.myGames) {
            return Object.keys(this.props.myGames).map(gameKey => {
                const game = this.props.myGames[gameKey];
                return <UserVideoGameListing key={gameKey} game={game}/>;
            });
        } else {
            return (
                <div className="userVideoGamesContainerEmpty">
                    <span>No games to load</span>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="userVideoGamesContainer">
                {this.userVideoGameListing()}
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(UserVideoGamesContainer);