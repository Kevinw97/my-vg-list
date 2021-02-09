import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGames} from '../actions/games'
import VideoGamesContainer from "./VideoGamesContainer";
import "../styles/games.css"

const mapStateToProps = (state) => {
    return {
        previousPage: state.games.data.previous,
        nextPage: state.games.data.next
    };
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    previousPage() {
        this.props.dispatch(getGames({
            url: this.props.previousPage
        }));
    }

    nextPage() {
        this.props.dispatch(getGames({
            url: this.props.nextPage
        }));
    }

    render() {
        return(
            <div className="home pageContainer">
                <VideoGamesContainer />
                <div className="pageNavigation">
                    <button disabled={!this.props.previousPage} onClick={this.previousPage}>Previous</button>
                    <button disabled={!this.props.nextPage} onClick={this.nextPage}>Next</button>
                </div>
            </div>
        )
    }
}



export default connect(
    mapStateToProps
)(Home);