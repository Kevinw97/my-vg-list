import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import "../styles/userGames.css";
import UserVideoGameTableRow from "./UserVideoGamesTableRow";
import {Redirect} from 'react-router-dom';
import {Button} from "react-bootstrap";
import {isLoaded} from "react-redux-firebase";
import {clearDirtyGames, updateGames} from "../actions/user";


function mapStateToProps(state) {
    return {
        auth: state.firebase.auth,
        myGames: state.firestore.data.myGames
    };
}

class UserVideoGamesTable extends Component {

    constructor(props) {
        super(props);
        this.updateGames = this.updateGames.bind(this);
    }

    updateGames() {
        console.log("updateGames");
        this.props.dispatch(updateGames());
    }

    renderGamesTable() {
        if (this.props.myGames) {
            return (
                <Fragment>
                    <table className="userVideoGamesTable">
                        <tbody className="userVideoGamesTableHeader">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th className="userVideoGamesTableDataHeader">Play Time (hours)</th>
                            <th className="userVideoGamesTableDataHeader">Personal Rating</th>
                            <th className="userVideoGamesTableDataHeader">Play Status</th>
                            <th className="userVideoGamesTableDataHeader">Platform</th>
                            <th className="userVideoGamesTableDataHeader"></th>
                        </tr>
                        </tbody>
                        {Object.keys(this.props.myGames).map(gameKey => {
                            const game = this.props.myGames[gameKey];
                            return game && <UserVideoGameTableRow key={game.id} game={game}/>
                        })}
                    </table>
                    <Button onClick={this.updateGames}>
                        Update
                    </Button>
                </Fragment>
            )
        } else {
            return (
                <div className="userVideoGamesTableEmpty">
                    <span>No games to load</span>
                </div>
            )
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearDirtyGames());
    }

    render() {
        if (isLoaded(this.props.auth) && !this.props.auth.uid) {
            return <Redirect to="/login"/>
        }
        return (
            <div className="userVideoGamesTableContainer pageContainer">
                {this.renderGamesTable()}
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(UserVideoGamesTable);