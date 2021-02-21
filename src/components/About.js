import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {};
}

class Header extends Component {

    render() {
        return(
            <div className="about page-container">
                <span>All game data is from the RAWG.io API</span>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(Header);