import React, { Component } from 'react';
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'

import { Navbar } from 'react-bootstrap';

import './style.css'

class Landing extends Component {
  render() {
    return (
      <div>
      	<Navbar className="xnote-navbar landing-navbar">
			<Navbar.Header>
				<Navbar.Brand>
					<a>Satska</a>
				</Navbar.Brand>

				<Navbar.Toggle />
			</Navbar.Header>

			<Navbar.Collapse>
				<Navbar.Text pullRight>
				<Navbar.Link href="/pricing">Pricing</Navbar.Link>
				<Navbar.Link href="/login">Log in</Navbar.Link>
				<Navbar.Link href="/pricing">Sign up</Navbar.Link>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
		<div className="landing-container">
	      	<Hero />
	      	<Features />
	      	<Footer />
      	</div>
      </div>
    );
  }
}

export default Landing;
