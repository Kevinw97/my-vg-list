import React from 'react';
import { connect } from 'react-redux';
import { getGames } from '../actions/games';
import { NavLink } from 'react-router-dom';
import "../styles/header.css"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        }
    }

    searchOnChange = event => {
        this.setState({searchValue: event.target.value});
    }

    searchSubmit = event => {
        this.props.dispatch(getGames({search:this.state.searchValue}));
        event.preventDefault();
    }

    render() {
        return(
            <nav>
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
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps)(Header);