import React, { Component } from 'react';

import { Button } from 'react-bootstrap'

class Hero extends Component {
  render() {
    return (
      <div className="hero">
	      <section>

            <h1 className="title">Software Engineer Screening as a Service</h1>
            <div className="button-panel">
              <Button bsStyle="primary" style={{marginRight: 5}}>Get Started</Button>
              <Button>Demo</Button>
            </div>

            <div className="caption caption-font">
              <p>Are coding puzzles really how you want to screen your candidates?</p>
              <p>Create and administer <b>code review based assessments</b>,</p>
              <p>that are far more aligned with real work.</p>
            </div>

	      </section>        
      </div>

    );
  }
}

export default Hero;
