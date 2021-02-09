import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {};
}

class Header extends Component {

    render() {
        return(
            <div className="about pageContainer">
                <p>About</p>
            </div>
        )
    }
}



export default connect(
    mapStateToProps
)(Header);