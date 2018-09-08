import React, { Component } from 'react';

import { Badge } from 'react-bootstrap'
import './style.css'

// props: 
// - isSubmitted
// - isStarted
class ProgressStateSpan extends Component {

	render() {
		let progressState = ''
		let color = ''

		if (this.props.isStarted && !this.props.isSubmitted) {
			progressState = 'is working on'
			color = 'yellow'
		} else if (this.props.isStarted && this.props.isSubmitted) {
			progressState = 'has submitted'
			color = 'green'
		} else if (!this.props.isStarted) {
			progressState = 'has not started'
			color ='gray'
		}

		return (
			<span className={"progress-state " + color}>{progressState}</span>
		);
	}
}

export default ProgressStateSpan;
