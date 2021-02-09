import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import {compose} from "redux";
import _ from "lodash"

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
    connect(mapStateToProps),
    firestoreConnect(props => {
        if (isLoaded(props.auth) && props.auth.uid) {
            return [{
                collection: "data",
                doc: props.auth.uid,
                subcollections: [{
                    collection: 'games'
                }],
                storeAs: "myGames",
                orderBy: ["name"]
            }]
        }
        return [];
    })
)(UserVideoGameListing);