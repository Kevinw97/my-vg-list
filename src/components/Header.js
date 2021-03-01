import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGames} from '../actions/games';
import {NavLink, withRouter} from 'react-router-dom';
import {signOut} from "../actions/auth";
import {isLoaded} from "react-redux-firebase";
import {compose} from "redux";
import {Button, Input} from "@material-ui/core";
import "../styles/header.scss"
import {Menu, Search} from "@material-ui/icons";

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
        this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);
    }

    state = {
        searchValue: "",
        showHamburgerMenu: false
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
                search: this.state.searchValue
            }}));
        this.props.history.push('/');
        event.preventDefault();
    }

    authButtons() {
        if (isLoaded(this.props.auth)) {
            if (this.props.auth.uid) {
                return (
                    <div className="navigation-button-container" key="signout">
                        <a href="/" className="navigation-button-link" onClick={this.signOut}>Log Out</a>
                    </div>);
            } else {
                return [
                    <div className="navigation-button-container" key="signup">
                        <NavLink to="/signup" className="navigation-button-link">
                            Sign Up
                        </NavLink>
                    </div>,
                    <div className="navigation-button-container" key="signin">
                        <NavLink to="/login" className="navigation-button-link">
                            Log In
                        </NavLink>
                    </div>
                ]
            }
        }
    }

    toggleHamburgerMenu() {
        this.setState({
            ...this.state,
            showHamburgerMenu: !this.state.showHamburgerMenu
        })
    }

    headerButtons() {
        if (isLoaded(this.props.auth)) {
            if (this.props.auth.uid) {
                return[
                    <div className="navigation-button-container" key="home">
                        <NavLink to="/" className="navigation-button-link">
                            Home
                        </NavLink>
                    </div>,
                    <div className="navigation-button-container" key="mylist">
                        <NavLink to="/mylist" className="navigation-button-link">
                            My List
                        </NavLink>
                    </div>,
                    <div className="navigation-button-container" key="about">
                        <NavLink to="/about" className="navigation-button-link">
                            About
                        </NavLink>
                    </div>
                ];
            } else {
                return[
                    <div className="navigation-button-container" key="home">
                        <NavLink to="/" className="navigation-button-link">
                            Home
                        </NavLink>
                    </div>,
                    <div className="navigation-button-container" key="about">
                        <NavLink to="/about" className="navigation-button-link">
                            About
                        </NavLink>
                    </div>
                ];
            }
        }
    }

    render() {
        return(
            <div className="header">
                <div className="nav inner-header">
                    {this.headerButtons()}
                    {this.authButtons()}
                    <Button className="inner-header-hamburger-menu" onClick={this.toggleHamburgerMenu}>
                        <Menu/>
                    </Button>
                </div>
                <div className="nav right-header">
                    <div className="search">
                        <div className="search-form">
                            <form onSubmit={this.searchSubmit}>
                                <Search/>
                                <Input
                                    type="text"
                                    placeholder="Search for a game..."
                                    onChange={this.searchOnChange}
                                    className="search-input"
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className={`header-hamburger-menu ${this.state.showHamburgerMenu ? "" : "hide-hamburger-menu"}`}>
                    {this.headerButtons()}
                    {this.authButtons()}
                </div>
            </div>
        )
    }
}

export default withRouter(
    compose(
        connect(mapStateToProps)
    )(Header));