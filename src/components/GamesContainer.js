import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGames} from '../actions/games'
import GameListing from "./GameListing";
import _ from "lodash"
import "../styles/games.scss";

const mapStateToProps = (state) => {
    return {
        games: state.games
    };
}

class GamesContainer extends Component {

    componentDidMount() {
        if (_.isEmpty(this.props.games.data) && !this.props.games.isLoading) {
            this.props.dispatch(getGames());
        }
    }

    renderGameListing() {
        if (this.props.games.isLoading) {
            return (<p>Loading...</p>);
        }
        if (!_.isEmpty(this.props.games.data.results)) {
            return this.props.games.data.results.map(game => (
                <GameListing key={game.id} game={game}/>
            ));
        } else {
            return (<p>No results</p>);
        }
    }

    render() {
        return(
            <div className="games-container">
                {this.renderGameListing()}
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(GamesContainer);