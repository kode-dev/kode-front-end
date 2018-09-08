import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-bootstrap'

import './style.css'

import Feat1Image from 'images/placeholder.svg'

class Features extends Component {
  render() {
    return (
      <div className="features caption-font">
      	<section>
      		<Grid>

           <Row className="feat-row">
                <Col className="feat-col" xs={12} md={4}>
                  <h2>1. </h2>
                  <p>Create code snippets in any language, that you want your candidates to review.</p>
                  <p>Customizable to personalize instructions for your candidate, and to enforce time limit constraints.</p>
                </Col>
                <Col className="feat-col" xs={12} md={4}>
                  <h2>2. Candidates Review Code</h2>  
                  <p>As if they were performing a code review for a teammate.</p>
                </Col> 
                <Col className="feat-col" xs={12} md={4}>
                  <h2>3. Analyze All Submissions in One Place</h2>  
                  <p>A single dashboard to see all submissions as they come in. You can ____.</p>
                </Col>  
          </Row>

            <Row className="feat-row">
              <Col className="feat-col" xs={12} md={6}>
                <h2>Communication</h2>
                <p>Gauge how well your candidates can communicate their technical understanding, in the form of their feedback on code.</p>
              </Col>
              <Col className="feat-col" xs={12} md={6}>
                <img src={Feat1Image} width="100%"></img>
              </Col>
            </Row>

            <Row className="feat-row">
              <Col className="feat-col" xs={12} md={6}>
                <img src={Feat1Image} width="100%"></img>
              </Col>
              <Col  className="feat-col" xs={12} md={6}>
                <h2>Systems Understanding</h2>
                <p>How well can your candidates ramp up on a new code base, and give feedback.  Fully flexible to allow you to create any kind of assignment, for any kind of role. </p>
              </Col>
            </Row>

            <Row className="feat-row">
              <Col className="feat-col" xs={12} md={6}>
                <h2>Scale</h2>
                <p>No more cloning repos for each new candidate. Centralize all candidate reviews in a single dashboard.</p>
              </Col>
              <Col className="feat-col" xs={12} md={6}>
                <img src={Feat1Image} width="100%"></img>
              </Col>
            </Row>

            <Row className="feat-row explanation">
              Code reviews are a common practice in great software engineering teams. By using an assessment that is in line with actual engineering work, you have a much better glimpse of how someone would actually work on the job, on your team. 
              Solving a programming puzzle well doesn't give much of a signal on how well a candidate can understand code, communicate that understanding to make the solution better.
            </Row>
          </Grid>
      	</section>
      </div>
    );
  }
}

export default Features;
