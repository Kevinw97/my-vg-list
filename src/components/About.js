import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {};
}

class Header extends Component {

    render() {
        return(
            <div className="about pageContainer">
                <span>All game data is from the RAWG.io API</span>
                <span>App created using React, Redux, and Firebase and Firestore</span>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(Header);