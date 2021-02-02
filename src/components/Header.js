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
                <div className="innerHeader">
                    <div className="navigation">
                        <NavLink to="/" className="navigationButtonLink">
                            <div className="navigationButtonContainer">
                                <h3>Home</h3>
                            </div>
                        </NavLink>
                        <NavLink to="/about" className="navigationButtonLink">
                            <div className="navigationButtonContainer">
                                <h3>About</h3>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="rightHeader">
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
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Header));