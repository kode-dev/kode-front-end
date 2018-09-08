import React, { Component } from 'react';

import { ProgressBar } from 'react-bootstrap';

const COLOR_MAP = {
    1: 'danger',
    2: 'warning',
    3: 'info',
    4: 'success',
    5: 'success'
}

// props:
// - name
// - score
// - description
class ScoreLine extends Component {
  render() {

    let progressBar = (
        <div>
            <ProgressBar bsStyle={COLOR_MAP[this.props.score]} now={20*this.props.score} />
            <span>{this.props.score}</span>
        </div>
    )

    return (
      <div className="score-line">
          <p><b>{this.props.name}</b></p>
          {progressBar}
          <p> {this.props.description} </p>
      </div>
    );
  }
}

export default ScoreLine;
