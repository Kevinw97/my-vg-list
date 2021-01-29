import React from 'react';

class VideoGameListing extends React.Component {

    render() {
        return(
            <div>
                <p>{this.props.game.name}</p>
            </div>
        )
    }
}

export default VideoGameListing;