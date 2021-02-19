import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {addDirtyGame, removeGame} from "../actions/user";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons"

function mapStateToProps(state, ownProps) {
    return {
        dirtyData: state.user.dirtyGames[ownProps.game.id]
    };
}

class UserGamesTableRow extends Component {
    state = {
        game: this.props.game
    }

    constructor(props) {
        super(props);
        this.onPlaytimeChange = this.onPlaytimeChange.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onPlatformChange = this.onPlatformChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onPlaytimeChange(event) {
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

    onPlatformChange(event) {
        this.setState({
            game: {
                ...this.state.game,
                selected_platform: event.target.value
            }
        });
        this.props.dispatch(addDirtyGame({
            id: this.state.game.id,
            changes: {
                selected_platform: event.target.value
            }
        }));
    }

    onDelete(event) {
        this.props.dispatch(removeGame(this.state.game.id));
    }



    render() {
        const game = this.state.game;
        return (
            <tbody className="user-games-table-row-body">
            <tr>
                <td>
                    <div className="user-games-table-image-container">
                        <NavLink to={"/games/" + game.id}>
                            <img src={game.background_image} className="user-games-table-image" alt=""></img>
                        </NavLink>
                    </div>
                </td>
                <td className="user-games-table-name">
                    <NavLink to={"/games/" + game.id}>
                        {game.name}
                    </NavLink>
                </td>
                <td className="user-games-table-data">
                    <input type="number" id="playtime-quantity" min="0" step="0.1" value={game.playtime} onChange={this.onPlaytimeChange} className="user-games-table-input"></input>
                </td>
                <td className="user-games-table-data">
                    <input type="number" id="rating-quantity" min="0" max="10" step="0.5" value={game.rating} onChange={this.onRatingChange} className="user-games-table-input"></input>
                </td>
                <td className="user-games-table-data">
                    <select value={game.status} onChange={this.onStatusChange} className="user-games-table-select">
                        <option value=""></option>
                        <option value="backlog">Backlog</option>
                        <option value="playing">Playing</option>
                        <option value="complete">Completed</option>
                    </select>
                </td>
                <td className="user-games-table-data">
                    <select value={game.selected_platform} onChange={this.onPlatformChange} className="user-games-table-select">
                        {
                            game.available_platforms && game.available_platforms.map(platformObject => {
                                const platform = platformObject.platform;
                                return <option value={platform.id} key={platform.id}>{platform.name}</option>
                            })
                        }
                    </select>
                </td>
                <td className="user-games-table-data">
                    <IconButton className="user-games-table-row-button" onClick={this.onDelete}>
                        <Delete/>
                    </IconButton>
                </td>
            </tr>
            </tbody>)
    }
}

export default connect(
    mapStateToProps,
)(UserGamesTableRow);