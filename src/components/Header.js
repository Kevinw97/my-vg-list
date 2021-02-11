import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGames} from '../actions/games';
import {test} from "../actions/user";
import {NavLink, withRouter} from 'react-router-dom';
import {signOut} from "../actions/auth";
import {isLoaded} from "react-redux-firebase";
import "../styles/header.css"
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    state = {
        searchValue: ""
    }

    signOut = event => {
        event.preventDefault();
        this.props.dispatch(signOut());
    }

    searchOnChange = event => {
        this.setState({
            searchValue: event.target.value
        });
    }

    searchSubmit = event => {
        this.props.dispatch(getGames({ params: {
                search:this.state.searchValue
            }}));
        this.props.history.push('/');
        event.preventDefault();
    }

    testFunction = event => {
        event.preventDefault();

        this.props.dispatch(test());
    }

    linkButtons() {
        if (isLoaded(this.props.auth)) {
            if (this.props.auth.uid) {
                return (
                    <li className="navigationButtonContainer" key="signout">
                        <a href="/" className="navigationButtonLink" onClick={this.signOut}>Log Out</a>
                    </li>);
            } else {
                return [
                    <li className="navigationButtonContainer" key="signup">
                        <NavLink to="/signup" className="navigationButtonLink">
                            Sign Up
                        </NavLink>
                    </li>,
                    <li className="navigationButtonContainer" key="signin">
                        <NavLink to="/login" className="navigationButtonLink">
                            Log In
                        </NavLink>
                    </li>
                ]
            }
        }
    }

    headerButtons() {
        if (isLoaded(this.props.auth)) {
            if (this.props.auth.uid) {
                return[
                    <li className="navigationButtonContainer" key="home">
                        <NavLink to="/" className="navigationButtonLink">
                            Home
                        </NavLink>
                    </li>,
                    <li className="navigationButtonContainer" key="mylist">
                        <NavLink to="/mylist" className="navigationButtonLink">
                            My List
                        </NavLink>
                    </li>,
                    <li className="navigationButtonContainer" key="about">
                        <NavLink to="/about" className="navigationButtonLink">
                            About
                        </NavLink>
                    </li>
                ];
            } else {
                return[
                    <li className="navigationButtonContainer" key="home">
                        <NavLink to="/" className="navigationButtonLink">
                            Home
                        </NavLink>
                    </li>,
                    <li className="navigationButtonContainer" key="about">
                        <NavLink to="/about" className="navigationButtonLink">
                            About
                        </NavLink>
                    </li>
                ];
            }
        }
    }

    render() {
        return(
            <div className="header">
                <ul className="nav innerHeader">
                    {this.headerButtons()}
                    <li className="navigationButtonContainer">
                        <a href="/" className="navigationButtonLink" onClick={this.testFunction}>Test</a>
                    </li>
                    {this.linkButtons()}
                </ul>
                <ul className="nav rightHeader">
                    <div className="search">
                        <div className="searchForm">
                            <form onSubmit={this.searchSubmit}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    onChange={this.searchOnChange}
                                />
                            </form>
                        </div>
                    </div>
                </ul>
            </div>
        )
    }
}

export default withRouter(
    compose(
        connect(mapStateToProps)
    )(Header));