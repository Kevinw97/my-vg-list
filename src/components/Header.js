import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGames} from '../actions/games';
import {NavLink, withRouter} from 'react-router-dom';
import {signOut} from "../actions/auth";
import {isLoaded} from "react-redux-firebase";
import {compose} from "redux";
import "../styles/header.css"

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

    authButtons() {
        if (isLoaded(this.props.auth)) {
            if (this.props.auth.uid) {
                return (
                    <li className="navigation-button-container" key="signout">
                        <a href="/" className="navigation-button-link" onClick={this.signOut}>Log Out</a>
                    </li>);
            } else {
                return [
                    <li className="navigation-button-container" key="signup">
                        <NavLink to="/signup" className="navigation-button-link">
                            Sign Up
                        </NavLink>
                    </li>,
                    <li className="navigation-button-container" key="signin">
                        <NavLink to="/login" className="navigation-button-link">
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
                    <li className="navigation-button-container" key="home">
                        <NavLink to="/" className="navigation-button-link">
                            Home
                        </NavLink>
                    </li>,
                    <li className="navigation-button-container" key="mylist">
                        <NavLink to="/mylist" className="navigation-button-link">
                            My List
                        </NavLink>
                    </li>,
                    <li className="navigation-button-container" key="about">
                        <NavLink to="/about" className="navigation-button-link">
                            About
                        </NavLink>
                    </li>
                ];
            } else {
                return[
                    <li className="navigation-button-container" key="home">
                        <NavLink to="/" className="navigation-button-link">
                            Home
                        </NavLink>
                    </li>,
                    <li className="navigation-button-container" key="about">
                        <NavLink to="/about" className="navigation-button-link">
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
                <ul className="nav inner-header">
                    {this.headerButtons()}
                    {this.authButtons()}
                </ul>
                <ul className="nav right-header">
                    <div className="search">
                        <div className="search-form">
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