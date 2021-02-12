import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import "../styles/userGames.css";
import {NavLink} from "react-router-dom";


function mapStateToProps(state) {
    return {
        auth: state.firebase.auth,
        myGames: state.firestore.data.myGames
    };
}

class UserVideoGamesTable extends Component {
    onPlaytimeChange(event) {
        console.log("change")
    }

    renderGameRows() {
        return Object.keys(this.props.myGames).map(gameKey => {
            const game = this.props.myGames[gameKey];
            return (
                <tbody key={game.id} className="userVideoGamesTableRowBody">
                <tr>
                    <td>
                        <div className="userVideoGamesTableImageContainer">
                            <NavLink to={"/games/" + game.id}>
                                <img src={game.background_image} className="userVideoGameTableImage" alt=""></img>
                            </NavLink>
                        </div>
                    </td>
                    <td className>
                        <NavLink to={"/games/" + game.id}>
                            {game.name}
                        </NavLink>
                    </td>
                    <td className="userVideoGamesTableData">
                        <input type="number" id="rating-quantity" min="0" max="10" value={game.playtime} onChange={this.onPlaytimeChange}></input>
                    </td>
                    <td className="userVideoGamesTableData">
                        {game.rating}
                    </td>
                    <td className="userVideoGamesTableData">
                        {game.status}
                    </td>
                </tr>
                </tbody>)
        });
    }

    render() {
        return (
            <div className="userVideoGamesTableContainer">
                {this.props.myGames ?
                    <table className="userVideoGamesTable">
                        <tbody className="userVideoGamesTableHeader">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th className="userVideoGamesTableDataHeader">Play Time</th>
                            <th className="userVideoGamesTableDataHeader">Rating</th>
                            <th className="userVideoGamesTableDataHeader">Status</th>
                        </tr>
                        </tbody>
                        {this.renderGameRows()}
                    </table> :
                    <div className="userVideoGamesTableEmpty">
                        <span>No games to load</span>
                    </div>
                }
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(UserVideoGamesTable);