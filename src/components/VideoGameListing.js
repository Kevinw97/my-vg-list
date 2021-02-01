import React from 'react';
import "../styles/games.css"
import { NavLink } from "react-router-dom";

class VideoGameListing extends React.Component {
    constructor(props) {
        super(props);
    }

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
                <span>Platforms: {this.props.game.platforms.map((platformObject) => platformObject.platform.name).join(", ")}</span>
                <br/>
                <span>Metacritic score: {this.props.game.metacritic}</span>
            </div>
        )
    }
}

export default VideoGameListing;