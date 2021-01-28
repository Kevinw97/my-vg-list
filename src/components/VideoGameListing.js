import React from 'react';

class VideoGameListing extends React.Component {

    render() {
        return(
            <div>
                <p>{this.props.game.name}</p>
                <img src={this.props.game.background_image} alt="Missing"></img>
            </div>
        )
    }
}

export default VideoGameListing;