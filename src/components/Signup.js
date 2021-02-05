import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Form, Container, Alert} from "react-bootstrap";
import "../styles/signing.css";
import {NavLink, withRouter} from "react-router-dom";
import {signUp} from "../actions/auth";

function mapStateToProps(state) {
    return {
        error: state.auth.error
    };
}

// Component referenced from https://www.youtube.com/watch?v=PKwu15ldZ7k

class Signup extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    handleSubmit = event => {
        event.preventDefault();

        const email = this.emailRef.current.value;
        const username = this.usernameRef.current.value;
        const password = this.passwordRef.current.value;

        const newUserCredentials = {email, username, password};

        this.props.dispatch(signUp(newUserCredentials)).then(() => {
            this.props.history.push('/');
        }).catch(() => {
            console.log("Sign up failed");
        });
    }

    render() {
        return (
            <Container className="d-flex flex-column align-items-center justify-content-center signUpContainer">
                <Card className="signUpCard">
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {this.props.error && <Alert variant="danger">{this.props.error}</Alert>}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={this.emailRef} required />
                            </Form.Group>
                            <Form.Group id="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" ref={this.usernameRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={this.passwordRef} required />
                            </Form.Group>
                            <Button className="w-100" type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <NavLink to="/login">Log In</NavLink>
                </div>
            </Container>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Signup));