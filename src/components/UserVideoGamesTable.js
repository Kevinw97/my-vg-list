import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import "../styles/userGames.css";
import UserVideoGameTableRow from "./UserVideoGamesTableRow";


function mapStateToProps(state) {
    return {
        auth: state.firebase.auth,
        myGames: state.firestore.data.myGames
    };
}

class UserVideoGamesTable extends Component {

    renderGameRows() {
        return Object.keys(this.props.myGames).map(gameKey => {
            const game = this.props.myGames[gameKey];
            return <UserVideoGameTableRow key={game.id} game={game}/>
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
                            <th className="userVideoGamesTableDataHeader">Play Time (hours)</th>
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