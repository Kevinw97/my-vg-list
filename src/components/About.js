import React from 'react';
import { connect } from 'react-redux';
import { getGames } from '../actions/games'

class Header extends React.Component {

    render() {
        return(
            <div className="about pageContainer">
                <p>About</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(Header);