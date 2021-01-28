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

    searchOnChange = event => {
        this.setState({searchValue: event.target.value});
    }

    searchSubmit = event => {
        this.props.dispatch(getGames({search:this.state.searchValue}));
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <div className="search">
                    <form onSubmit={this.searchSubmit}>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={this.searchOnChange}
                        />
                    </form>
                </div>
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