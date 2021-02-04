import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGames} from '../actions/games'
import VideoGameListing from "./VideoGameListing";
import "../styles/games.css";
import _ from "lodash"

const mapStateToProps = (state) => {
    return {
        games: state.games
    };
}

class VideoGamesContainer extends Component {

    componentDidMount() {
        if (_.isEmpty(this.props.games.data)) {
            this.props.dispatch(getGames());
        }
    }

    videoGameListing() {
        if (this.props.games.isLoading) {
            return (<p>Loading...</p>);
        }
        if (!_.isEmpty(this.props.games.data.results)) {
            return this.props.games.data.results.map(game => (
                <VideoGameListing key={game.id} game={game}/>
            ));
        } else {
            return (<p>No results</p>);
        }
    }

    render() {
        return(
            <div className="videoGamesContainer">
                {this.videoGameListing()}
            </div>
        )
    }
}



export default connect(mapStateToProps)(VideoGamesContainer);