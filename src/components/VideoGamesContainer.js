import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGames} from '../actions/games'
import VideoGameListing from "./VideoGameListing";
import "../styles/games.css"

const mapStateToProps = (state) => {
    return {
        games: state.games
    };
}

class VideoGamesContainer extends Component {

    componentDidMount() {
        if (!this.props.games.isLoaded && !this.props.games.isLoading) {
            this.props.dispatch(getGames());
        }
    }

    render() {
        return(
            <div className="videoGamesContainer">
                {this.props.games.isLoaded ?
                    this.props.games.data.results.map(game => (
                        <VideoGameListing key={game.id} game={game}/>
                    )) :
                    (<p>Loading...</p>)}
            </div>
        )
    }
}



export default connect(mapStateToProps)(VideoGamesContainer);