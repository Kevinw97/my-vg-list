import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../styles/userGames.css";
import {NavLink} from "react-router-dom";

function mapStateToProps(state) {
    return {};
}

class UserVideoGameListing extends Component {
    render() {
        return (
            <div className="userVideoGameListing">
                <NavLink to={"/games/" + this.props.game.id}>
                    <div className="videoGameImage" style={{
                        backgroundImage: `url(${this.props.game.background_image})`
                    }}>
                    </div>
                </NavLink>
                <div className="userVideoGameListingName">
                    <span>{this.props.game.name}</span>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(UserVideoGameListing);