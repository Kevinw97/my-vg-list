import React, {Component} from 'react';
import {connect} from "react-redux";
import {getGame} from "../actions/games";
import ReactHtmlParser from "react-html-parser";
import _ from "lodash";

const mapStateToProps = (state) => {
    return {};
}

class GamePage extends Component {
    state = {
        game: null
    }

    constructor() {
        super();
        this.gamePageRef = React.createRef();
        this.gamePageBackgroundRef = React.createRef();
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.game_id;
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
        this.props.dispatch(getGame(id)).then(data => {
            this.setState({
                game: data
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleResize();
    }

    componentWillUnmount() {
        window.addEventListener("resize", null);
    }

    handleResize() {
        if (this.gamePageRef && this.gamePageRef.current && this.gamePageBackgroundRef && this.gamePageBackgroundRef.current) {
            const gamePageBoundingRect = this.gamePageRef.current.getBoundingClientRect();
            const gamePageBackgroundElement = this?.gamePageBackgroundRef.current;
            gamePageBackgroundElement.style.width = gamePageBoundingRect.width + "px";
            gamePageBackgroundElement.style.height = gamePageBoundingRect.height + "px";
        }

    }

    render() {
        return (
            <div className="page-container game-page-container">
                {this.state.game ?
                    <div className="game-page-description" ref={this.gamePageRef}>
                        <div className="game-page-background-image" ref={this.gamePageBackgroundRef} style={{backgroundImage: `url(${this.state.game.background_image})`}}></div>
                        <h2>{this.state.game.name}</h2>
                        <br/>
                        <br/>
                        <h4>About</h4>
                        <div className="game-page-description-about">
                            {ReactHtmlParser(this.state.game.description)}
                        </div>
                        <br/>
                        <h6>Platforms</h6>
                        <span>{
                            !_.isEmpty(this.state.game.platforms) ?
                                this.state.game.platforms.map((platformObject) => platformObject.platform.name).join(", ") :
                                <span>N/A</span>
                        }</span>
                        <br/>
                        <h6>Website: <a href={this.state.game.website} target="_blank" rel="noreferrer">{this.state.game.website}</a></h6>
                        <br/>
                        <h6>{`Metacritic score: ${this.state.game.metacritic}`}</h6>
                    </div> :
                    <p>"Loading..."</p>
                }

            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(GamePage);