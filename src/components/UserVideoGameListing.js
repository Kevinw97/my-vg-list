import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";

function mapStateToProps(state) {
    return {
        auth: state.firebase.auth,
        myGames: state.firestore.data.myGames
    };
}

class UserVideoGameListing extends Component {
    render() {
        return (
            <div>
                {(this.props.myGames) ?
                    Object.keys(this.props.myGames).map(gameKey => {
                        const game = this.props.myGames[gameKey];
                        return (
                            <div key={game.id}>
                                <span>{game.name}</span>
                            </div>
                        )
                    }):
                    <span>Loading...</span>
                }
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(UserVideoGameListing);