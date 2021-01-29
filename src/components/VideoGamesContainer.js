import React from 'react';
import { connect } from 'react-redux';
import { getGames } from '../actions/games'
import VideoGameListing from "./VideoGameListing";

class VideoGamesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        }
    }

    componentDidMount() {
        this.props.dispatch(getGames());
    }



    render() {
        return(
            <div>
                <div className="videoGamesList">
                    {this.props.games.isLoaded ?
                        this.props.games.data.results.map(game => (
                            <VideoGameListing key={game.id} game={game}/>
                        )) :
                        (<p>Loading...</p>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        games: state.games
    };
}

export default connect(mapStateToProps)(VideoGamesContainer);