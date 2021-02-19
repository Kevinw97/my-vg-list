import React, {Component} from 'react';
import {connect} from "react-redux";
import {getGame} from "../actions/games";
import ReactHtmlParser from "react-html-parser";

const mapStateToProps = (state) => {
    return {};
}

class GamePage extends Component {
    state = {
        game: null
    }

    componentDidMount() {
        const id = this.props.match.params.game_id;
        this.props.dispatch(getGame(id)).then(data => {
            this.setState({
                game: data
            });
        });
    }

    render() {
        return (
            <div className="page-container game-page-container">
                <div className="game-page-description">
                    <h4>About</h4>
                    {this.state.game ? ReactHtmlParser(this.state.game.description) : <p>"Loading..."</p>}
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(GamePage);