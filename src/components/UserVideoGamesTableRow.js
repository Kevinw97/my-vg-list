import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {addDirtyGame} from "../actions/user";

function mapStateToProps(state) {
    return {};
}

class UserVideoGamesTableRow extends Component {
    state = {
        game: this.props.game
    }

    constructor(props) {
        super(props);
        this.onPlaytimeChange = this.onPlaytimeChange.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
    }

    onPlaytimeChange(event) {
        console.log("onPlaytimeChange");
        this.setState({
            game: {
                ...this.state.game,
                playtime: parseFloat(event.target.value)
            }
        });
        this.props.dispatch(addDirtyGame({
            id: this.state.game.id,
            changes: {
                playtime:parseFloat(event.target.value)
            }
        }));
    }

    onRatingChange(event) {
        console.log("onRatingChange");
        this.setState({
            game: {
                ...this.state.game,
                rating: parseFloat(event.target.value)
            }
        });
        this.props.dispatch(addDirtyGame({
            id: this.state.game.id,
            changes: {
                rating:parseFloat(event.target.value)
            }
        }));
    }

    onStatusChange(event) {
        console.log("onStatusChange");
        this.setState({
            game: {
                ...this.state.game,
                status: event.target.value
            }
        });
        this.props.dispatch(addDirtyGame({
            id: this.state.game.id,
            changes: {
                status: event.target.value
            }
        }));
    }

    render() {
        const game = this.state.game;
        return (
            <tbody className="userVideoGamesTableRowBody">
            <tr>
                <td>
                    <div className="userVideoGamesTableImageContainer">
                        <NavLink to={"/games/" + game.id}>
                            <img src={game.background_image} className="userVideoGameTableImage" alt=""></img>
                        </NavLink>
                    </div>
                </td>
                <td className="userVideoGamesTableName">
                    <NavLink to={"/games/" + game.id}>
                        {game.name}
                    </NavLink>
                </td>
                <td className="userVideoGamesTableData">
                    <input type="number" id="playtime-quantity" min="0" step="0.1" value={game.playtime} onChange={this.onPlaytimeChange}></input>
                </td>
                <td className="userVideoGamesTableData">
                    <input type="number" id="rating-quantity" min="0" max="10" step="0.5" value={game.rating} onChange={this.onRatingChange}></input>
                </td>
                <td className="userVideoGamesTableData">
                    <select value={game.status} onChange={this.onStatusChange}>
                        <option value=""></option>
                        <option value="backlog">Backlog</option>
                        <option value="playing">Playing</option>
                        <option value="complete">Completed</option>
                    </select>
                </td>
            </tr>
            </tbody>)
    }
}

export default connect(
    mapStateToProps,
)(UserVideoGamesTableRow);