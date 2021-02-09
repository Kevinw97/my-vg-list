import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../styles/games.css"
import {NavLink} from "react-router-dom";
import _ from 'lodash';

const mapStateToProps = (state) => {
    return {};
}

class VideoGameListing extends Component {

    render() {
        return(
            <div className="videoGameListing">
                <NavLink to={"/games/" + this.props.game.id}>
                    <div className="videoGameImage" style={{
                        backgroundImage: `url(${this.props.game.background_image})`
                    }}>
                    </div>
                </NavLink>
                <span>{this.props.game.name}</span>
                <br/>
                <span>Platforms: {
                    !_.isEmpty(this.props.game.platforms) ?
                        this.props.game.platforms.map((platformObject) => platformObject.platform.name).join(", ") :
                        <span>N/A</span>
                }</span>
                <br/>
                <span>Metacritic score: {this.props.game.metacritic}</span>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(VideoGameListing);