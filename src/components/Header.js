import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getGames} from '../actions/games';
import {NavLink, withRouter} from 'react-router-dom';
import "../styles/header.css"

const mapStateToProps = (state) => {
    return {};
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.searchSubmit = this.searchSubmit.bind(this);
    }

    state = {
        searchValue: ""
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

    render() {
        return(
            <div className="header">
                <ul className="nav innerHeader">
                    <li className="navigationButtonContainer">
                        <NavLink to="/" className="navigationButtonLink">
                            Home
                        </NavLink>
                    </li>
                    <li className="navigationButtonContainer">
                        <NavLink to="/about" className="navigationButtonLink">
                            About
                        </NavLink>
                    </li>
                    <li className="navigationButtonContainer">
                        <NavLink to="/signup" className="navigationButtonLink">
                            Sign Up
                        </NavLink>
                    </li>
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

export default withRouter(connect(mapStateToProps)(Header));