import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGames} from '../actions/games'
import GamesContainer from "./GamesContainer";
import {Button} from "react-bootstrap";
import "../styles/games.scss"
import {ArrowLeft, ArrowRight} from "@material-ui/icons";

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
            <div className="home page-container">
                <GamesContainer />
                <span className="rawg-hyperlink" style={{textAlign: "center"}}>All game data is fetched using the <a href="https://rawg.io/" target="_blank" rel="noreferrer">RAWG.io</a> API</span>
                <div className="page-navigation">
                    <Button className="page-navigation-button" disabled={!this.props.previousPage} onClick={this.previousPage}><ArrowLeft/></Button>
                    <Button className="page-navigation-button" disabled={!this.props.nextPage} onClick={this.nextPage}><ArrowRight/></Button>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(Home);