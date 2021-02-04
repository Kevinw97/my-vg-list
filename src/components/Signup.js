import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Form, Container} from "react-bootstrap";
import "../styles/signing.css";

function mapStateToProps(state) {
    return {};
}

// Component referenced from https://www.youtube.com/watch?v=PKwu15ldZ7k

class Signup extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordConfirmRef = React.createRef();
    }

    render() {
        return (
            <Container className="d-flex flex-column align-items-center justify-content-center signUpContainer">
                <Card className="signUpCard">
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <Form>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={this.emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={this.passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={this.passwordConfirmRef} required />
                            </Form.Group>
                            <Button className="w-100">Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? Log In
                </div>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(Signup);