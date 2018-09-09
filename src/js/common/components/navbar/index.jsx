import React, { Component } from 'react';

import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'

import './Navbar.css'

// props:
// - user: {firstName, lastName}
class KodeNavbar extends Component {
  render() {
    let userName = (this.props.user) ? this.props.user.firstName : "";
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">KodeScreen</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>

          <Nav pullRight>
            <NavDropdown eventKey={3} title={userName} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Contact Support</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Logout</MenuItem>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default KodeNavbar;
