import React, { Component } from 'react';
import ProgressStateSpan from '../SubmissionProgressStateSpan'
import './style.css'

// props: 
// - assignmentTitle
// - assignmentTimeLimit
// - isStarted
// - isSubmitted
// - candidateFirstName
// - candidateLastName
// - displayAssignment?
class ResponseListItem extends Component {

	render() {
		return (
			<div onClick={this.props.onClick} className="response-list-item card">
				<span className="list-item-span">{this.props.candidateFirstName + ' ' + this.props.candidateLastName}</span>
				<span className="list-item-span">
					<ProgressStateSpan 
						isStarted={this.props.isStarted} 
						isSubmitted={this.props.isSubmitted} 
					/>
				</span>
				<span className="list-item-span"><b>{this.props.assignmentTitle}</b></span>
			</div>
		);
	}
}

export default ResponseListItem;
