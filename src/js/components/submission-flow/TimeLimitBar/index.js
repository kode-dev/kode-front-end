import React, { Component } from 'react';
import './TimeLimitBar.css';

import { getTimeLeftString } from 'utility/util'

// - timeLeft
// - setTimeLeft(timeSeconds)
class TimeLimitBar extends Component {
  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
  }

  tick() {
    if (this.props.timeLeft > 0) this.props.setTimeLeft(this.props.timeLeft - 1)
    else clearInterval(this.interval)
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  render() {
    if (this.props.isSubmitted) return null

    let color = (this.props.timeLeft < 10) ? 'btn-danger' :
                ((this.props.timeLeft >= 10 && this.props.timeLeft < 60) ? 'btn-warning' : 'btn-success')
    return (
      <div className={"time-limit-container " + color}>
        {(this.props.timeLeft > 0) ? getTimeLeftString(this.props.timeLeft) : 'No time left'}
      </div>
    )
  }
}

export default TimeLimitBar;
