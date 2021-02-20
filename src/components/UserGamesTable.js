import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {Redirect} from 'react-router-dom';
import {Button} from "react-bootstrap";
import {isLoaded} from "react-redux-firebase";
import {clearDirtyGames, updateGames} from "../actions/user";
import UserGamesTableRow from "./UserGamesTableRow";
import _ from "lodash";
import "../styles/userGames.scss";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

function mapStateToProps(state) {
    return {
        auth: state.firebase.auth,
        myGames: state.firestore.data.myGames,
        dirtyGames: state.user.dirtyGames
    };
}

class UserGamesTable extends Component {
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

        this.nameRef = React.createRef();
        this.playTimeRef = React.createRef();
        this.ratingRef = React.createRef();
        this.statusRef = React.createRef();
        this.platformRef = React.createRef();

        this.headerMapping = {
            name: this.nameRef,
            playtime: this.playTimeRef,
            rating: this.ratingRef,
            status: this.statusRef,
            platform: this.platformRef
        };
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
        this.props.dispatch(updateGames());
    }

    sortByName(event) {
        this.setSortedHeader("name");
        const sortedGames = this.state.myGames.sort((game1, game2) => {
            if (this.state.nameAscending) {
                return game1.name < game2.name ? 1 : -1;
            } else {
                return game2.name < game1.name ? 1 : -1;
            }
        });
        this.setState({
            ...this.state,
            myGames: sortedGames,
            nameAscending : !this.state.nameAscending
        });
    }

    sortByPlayTime(event) {
        this.setSortedHeader("playtime");
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
        this.setSortedHeader("rating");
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
        this.setSortedHeader("status");
        const sortedGames = this.state.myGames.sort((game1, game2) => {
            if (this.state.statusAscending) {
                return game1.status < game2.status ? 1 : -1;
            } else {
                return game2.status < game1.status ? 1 : -1;
            }
        });
        this.setState({
            ...this.state,
            myGames: sortedGames,
            statusAscending : !this.state.statusAscending
        });
    }

    sortByPlatform(event) {
        this.setSortedHeader("platform");
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

    setSortedHeader(name) {
        Object.keys(this.headerMapping).forEach(headerName => {
            const headerRef = this.headerMapping[headerName].current;
            if (name === headerName) {
                headerRef.classList.add("sorted-header");
            } else {
                headerRef.classList.remove("sorted-header");
            }
        });
    }

    shouldDisableUpdateButton() {
        return _.isEmpty(this.props.dirtyGames);
    }

    renderGamesTable() {
        if (!_.isEmpty(this.state.myGames)) {
            return (
                <Fragment>
                    <table className="user-games-table">
                        <tbody className="user-games-table-header">
                        <tr>
                            <th className="user-games-table-title-header" ></th>
                            <th className="user-games-table-title-header" onClick={this.sortByName} ref={this.nameRef}>
                                <div className="user-games-table-title user-games-table-sortable-header">Name</div>
                                {this.nameRef.current &&
                                this.nameRef.current.classList.contains("sorted-header") &&
                                (this.state.nameAscending ?
                                    <ArrowDropUp/> :
                                    <ArrowDropDown/>)}
                            </th>
                            <th onClick={this.sortByPlayTime} className="user-games-table-data-header" ref={this.playTimeRef}>
                                <div className="user-games-table-title-header user-games-table-sortable-header">Play Time (hours)</div>
                                {this.playTimeRef.current &&
                                this.playTimeRef.current.classList.contains("sorted-header") &&
                                (this.state.playTimeAscending ?
                                    <ArrowDropUp/> :
                                    <ArrowDropDown/>)}
                            </th>
                            <th onClick={this.sortByRating} className="user-games-table-data-header" ref={this.ratingRef}>
                                <div className="user-games-table-title-header user-games-table-sortable-header">Personal Rating</div>
                                {this.ratingRef.current &&
                                this.ratingRef.current.classList.contains("sorted-header") &&
                                (this.state.ratingAscending ?
                                    <ArrowDropUp/> :
                                    <ArrowDropDown/>)}
                            </th>
                            <th onClick={this.sortByStatus} className="user-games-table-data-header" ref={this.statusRef}>
                                <div className="user-games-table-title-header user-games-table-sortable-header">Play Status</div>
                                {this.statusRef.current &&
                                this.statusRef.current.classList.contains("sorted-header") &&
                                (this.state.statusAscending ?
                                    <ArrowDropUp/> :
                                    <ArrowDropDown/>)}
                            </th>
                            <th onClick={this.sortByPlatform} className="user-games-table-data-header" ref={this.platformRef}>
                                <div className="user-games-table-title-header user-games-table-sortable-header">Platform</div>
                                {this.platformRef.current &&
                                this.platformRef.current.classList.contains("sorted-header") &&
                                (this.state.platformAscending ?
                                    <ArrowDropUp/> :
                                    <ArrowDropDown/>)}
                            </th>
                            <th className="user-games-table-data-header"></th>
                        </tr>
                        </tbody>
                        {this.state.myGames.map(game => {
                            return game && <UserGamesTableRow key={game.id} game={game}/>
                        })}
                    </table>
                </Fragment>
            )
        } else {
            return (
                <div className="user-games-table-empty">
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
            <div className="user-games-table-container page-container">
                {this.renderGamesTable()}
                <div className="user-games-table-buttons">
                    <Button disabled={this.shouldDisableUpdateButton()} className="user-games-table-button" onClick={this.updateGames}>
                        Update
                    </Button>
                </div>
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(UserGamesTable);