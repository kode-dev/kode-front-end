import React, { Component } from 'react';
import './Navbar.css'
import { Navbar } from 'react-bootstrap';

import FlashMessages from 'commonComponents/FlashMessages'


// props:
// - candidateFullName
// - timeLimitBar
// - isStarted
// - flashMessages
class SubmissionFlowNavbar extends Component {
  render() {
    return (
      <Navbar className="xnote-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a>KodeReview</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>

          {(this.props.candidateFullName) ?
            <Navbar.Text>
              Signed in as candidate: <Navbar.Link className="candidate-name">{this.props.candidateFullName}</Navbar.Link>
            </Navbar.Text> : ''
          }

          {(this.props.isStarted) ?
            <Navbar.Text className="timer no-margin">
              {this.props.timeLimitBar}
            </Navbar.Text> : ''
          }

          <Navbar.Text pullRight>
            <Navbar.Link href="#" onClick={this.props.onSignOut}>Sign out</Navbar.Link>
          </Navbar.Text>

        </Navbar.Collapse>
        {(this.props.flashMessages.length > 0) ?
          <FlashMessages flashMessages={this.props.flashMessages} /> : ''
        }
      </Navbar>
    );
  }
}

export default SubmissionFlowNavbar;
