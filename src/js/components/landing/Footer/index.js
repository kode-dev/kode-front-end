import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-bootstrap'

//import Logo from 'assets/Logo.svg'

class Footer extends Component {
  render() {
  	return (
  		<section>
  			<Grid>
  				<Row>
  					<Col xs={12} md={6}>

	                </Col>
	  				<Col xs={12} md={3}>
	                  <h3>About</h3>
	                  <p><a href="/pricing">Pricing</a></p>
	                  <p><a href="/pricing">Sign Up</a></p>
	                </Col>
	                <Col xs={12} md={3}>
	                  <h3>Contact Us</h3>  
	                  <p><a href="mailto:kartuppuluri@gmail.com">Contact KodeReview via Email</a></p>
	                  <p>(310) 561-9965</p>
	                </Col> 
  				</Row>
  			</Grid>
  		</section>
  	)
  }
}

export default Footer;
