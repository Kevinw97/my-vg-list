import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {};
}

class Header extends Component {

    render() {
        return(
            <div className="about page-container">
                <span>This is a simple web app for browsing games and adding them to a personal backlog, and tracking hours.</span>
                <span>All game data is from the RAWG.io API</span>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(Header);