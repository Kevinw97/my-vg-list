import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {

    componentDidMount() {
    }

    render() {
        return(
            <div>
                <p>This is the main app component</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(App);