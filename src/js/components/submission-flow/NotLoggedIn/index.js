import React, { Component } from 'react';
import './NotLoggedIn.css'

import { Button } from 'react-bootstrap'

// - loginError
// - loginCandidate(password)
// - assignmentIsDemo
class NotLoggedIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ""
    }
  }

  render() {

    let message = (this.props.assignmentIsDemo) ? "Welcome to KodeReview assignment. This is a demo. To unlock the assignment, enter 'password' as the password. Typically you would have your candidates enter some kind of passphrase to unlock an assignment." : 'Welcome to CodeReviewAssignment. You should have a gotten a password to unlock this assignment from the person who shared this link. Please enter that password below:'

    return (
      <div className="not-logged-in">
        <p>
          {message}
        </p>

        {(this.props.loginError) ? (<p className="login-error">{this.props.loginError}</p>) : ''}

        <p><input
          type='password'
          value={this.state.value}
          onChange={(e) => this.setState({value: e.target.value})}
        ></input></p>

        <Button bsStyle="primary" onClick={() => this.props.loginCandidate(this.state.value)}>Unlock</Button>

      </div>
    );
  }
}

export default NotLoggedIn;
