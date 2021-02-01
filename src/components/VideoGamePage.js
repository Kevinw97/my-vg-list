import React from 'react';
import { connect } from "react-redux";
import { getGame } from "../actions/games";

class VideoGamePage extends React.Component {
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
            <div>
                <span>{this.state.game ? this.state.game.description : "Loading..."}</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(VideoGamePage);