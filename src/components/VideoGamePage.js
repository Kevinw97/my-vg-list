import React from 'react';
import {connect} from "react-redux";

class VideoGamePage extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.game_id;
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <h1>ROUTE PARAMETER</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(VideoGamePage);