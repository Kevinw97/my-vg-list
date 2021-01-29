import React from 'react';
import "../styles/games.css"

class VideoGameListing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="videoGameListing">
                <div className="videoGameImage" style={{
                    backgroundImage: `url(${this.props.game.background_image})`
                }}>
                </div>
                <span>{this.props.game.name}</span>
            </div>
        )
    }
}

export default VideoGameListing;