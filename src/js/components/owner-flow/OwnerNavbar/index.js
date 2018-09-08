import React, { Component } from 'react';
import './style.css'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap'

import FlashMessages from 'commonComponents/FlashMessages'


// props:
// - ownerFirstName
// - ownerLastName
// - ownerEmail
// - flashMessages
class OwnerFlowNavbar extends Component {
  render() {

    let props = this.props

    let createAssignmentLink = (this.props.path === '/create-assignment') ? '' :             
            (<NavItem eventKey={1} href="#/create-assignment">
                <div className="special-link">Create Assignment</div>
            </NavItem>)

    return (
      <Navbar className="xnote-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a>KodeReview</a>
          </Navbar.Brand>
        </Navbar.Header>

        <Navbar.Collapse>

          <Nav pullRight>
            <NavItem eventKey={1} href="#/dashboard">
              Dashboard
            </NavItem>
            {createAssignmentLink}
            <NavDropdown eventKey={3} title={(props.ownerFirstName) ? (props.ownerFirstName) : ""} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Account</MenuItem>
              <MenuItem eventKey={3.2}>Logout</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>email: {props.ownerEmail}</MenuItem>
              <MenuItem eventKey={3.3}>Contact Support</MenuItem>
           </NavDropdown>
          </Nav>

        </Navbar.Collapse>

        {(props.flashMessages.length > 0) ?
          <FlashMessages flashMessages={props.flashMessages} /> : ''
        }

      </Navbar>
    );
  }
}

export default OwnerFlowNavbar;
