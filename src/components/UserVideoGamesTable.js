import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {Redirect} from 'react-router-dom';
import {Button} from "react-bootstrap";
import {isLoaded} from "react-redux-firebase";
import {clearDirtyGames, updateGames} from "../actions/user";
import UserVideoGameTableRow from "./UserVideoGamesTableRow";
import _ from "lodash";
import "../styles/userGames.css";

function mapStateToProps(state) {
    return {
        auth: state.firebase.auth,
        myGames: state.firestore.data.myGames
    };
}

class UserVideoGamesTable extends Component {
    state = {
        myGames: [],
        nameAscending: true,
        playTimeAscending: true,
        ratingAscending: true,
        statusAscending: true,
        platformAscending: true
    }

    constructor(props) {
        super(props);
        this.updateGames = this.updateGames.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.sortByPlayTime = this.sortByPlayTime.bind(this);
        this.sortByRating = this.sortByRating.bind(this);
        this.sortByStatus = this.sortByStatus.bind(this);
        this.sortByPlatform = this.sortByPlatform.bind(this);
    }

    componentDidMount() {
        if (this.props.myGames) {
            this.setState({
                myGames: Object.values(this.props.myGames)
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.myGames !== this.props.myGames) {
            if (this.props.myGames) {
                this.setState({
                    myGames: Object.values(this.props.myGames)
                });
            } else {
                this.setState({
                    myGames: []
                });
            }
        }
    }

    updateGames() {
        console.log("updateGames");
        this.props.dispatch(updateGames());
    }

    sortByName(event) {
        console.log("sortByName");
        const sortedGames = this.state.myGames.sort((game1, game2) => {
            if (this.state.nameAscending) {
                return game1.name < game2.name ? -1 : 1;
            } else {
                return game2.name < game1.name ? -1 : 1;
            }
        });
        this.setState({
            ...this.state,
            myGames: sortedGames,
            nameAscending : !this.state.nameAscending
        });
    }

    sortByPlayTime(event) {
        console.log("sortByPlayTime");
        const sortedGames = this.state.myGames.sort((game1, game2) => {
            if (this.state.playTimeAscending) {
                return game1.playtime < game2.playtime ? 1 : -1;
            } else {
                return game2.playtime < game1.playtime ? 1 : -1;
            }
        });
        this.setState({
            ...this.state,
            myGames: sortedGames,
            playTimeAscending : !this.state.playTimeAscending
        });
    }

    sortByRating(event) {
        console.log("sortByRating");
        const sortedGames = this.state.myGames.sort((game1, game2) => {
            if (this.state.ratingAscending) {
                return game1.rating < game2.rating ? 1 : -1;
            } else {
                return game2.rating < game1.rating ? 1 : -1;
            }
        });
        this.setState({
            ...this.state,
            myGames: sortedGames,
            ratingAscending : !this.state.ratingAscending
        });
    }

    sortByStatus(event) {
        console.log("sortByStatus");
        const sortedGames = this.state.myGames.sort((game1, game2) => {
            if (this.state.statusAscending) {
                return game1.status < game2.status ? -1 : 1;
            } else {
                return game2.status < game1.status ? -1 : 1;
            }
        });
        this.setState({
            ...this.state,
            myGames: sortedGames,
            statusAscending : !this.state.statusAscending
        });
    }

    sortByPlatform(event) {
        console.log("sortByPlatform");
        const sortedGames = this.state.myGames.sort((game1, game2) => {
            if (this.state.platformAscending) {
                return game1.selected_platform < game2.selected_platform ? -1 : 1;
            } else {
                return game2.selected_platform < game1.selected_platform ? -1 : 1;
            }
        });
        this.setState({
            ...this.state,
            myGames: sortedGames,
            platformAscending : !this.state.platformAscending
        });
    }

    renderGamesTable() {
        if (!_.isEmpty(this.state.myGames)) {
            return (
                <Fragment>
                    <table className="userVideoGamesTable">
                        <tbody className="userVideoGamesTableHeader">
                        <tr>
                            <th>Image</th>
                            <th><div onClick={this.sortByName}>Name</div></th>
                            <th className="userVideoGamesTableDataHeader"><div onClick={this.sortByPlayTime}>Play Time (hours)</div></th>
                            <th className="userVideoGamesTableDataHeader"><div onClick={this.sortByRating}>Personal Rating</div></th>
                            <th className="userVideoGamesTableDataHeader"><div onClick={this.sortByStatus}>Play Status</div></th>
                            <th className="userVideoGamesTableDataHeader"><div onClick={this.sortByPlatform}>Platform</div></th>
                            <th className="userVideoGamesTableDataHeader"></th>
                        </tr>
                        </tbody>
                        {this.state.myGames.map(game => {
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