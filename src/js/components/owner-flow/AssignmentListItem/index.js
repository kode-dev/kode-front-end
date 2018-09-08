import React, { Component } from 'react';

import { getTimeLimitString } from 'utility/util'

import './style.css'

// props: 
// - assignmentTitle
// - timeLimit
// - onClick
class AssignmentListItem extends Component {
	render() {
		return (
			<div onClick={this.props.onClick} className="assignment-list-item card">
				<p className="assignment-title"><b>{this.props.title}</b></p>
				<p className="assignment-time-limit"><span className="assignment-label">time limit: </span>{getTimeLimitString(this.props.timeLimit)}</p>
			</div>
		);
	}
}

export default AssignmentListItem;
