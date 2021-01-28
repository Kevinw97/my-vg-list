import React from 'react';
import { connect } from 'react-redux';
import VideoGamesContainer from "./VideoGamesContainer";

class App extends React.Component {

    render() {
        return(
            <div>
                <VideoGamesContainer />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(App);