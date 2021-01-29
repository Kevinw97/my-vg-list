import React from 'react';
import { connect } from 'react-redux';
import { getGames } from '../actions/games'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        }
    }

    componentDidMount() {
        this.props.dispatch(getGames());
    }

    render() {
        return(
            <div className="about pageContainer">
                <p>About</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        games: state.games
    };
}

export default connect(mapStateToProps)(Header);