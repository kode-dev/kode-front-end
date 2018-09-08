import React, { Component } from 'react';
import AssignmentListItem from '../AssignmentListItem'
import LoadingSpinner from 'commonComponents/LoadingSpinner'

import './AssignmentList.css'
// props: 
// - assignments[]
// - fetching
// - getAssignmentList()
// - history

// For each assignment, use the properties: 
// - title
// - time limit duration
class AssignmentList extends Component {

	render() {
		let assignments = this.props.assignments.map((assignment, i) => {
			return (
				<AssignmentListItem 
					title={assignment.title}
					timeLimit={assignment.timeLimit}
					onClick={() => {this.props.history.push("/assignment/" + assignment._id)}}
					key={i}
				/>
			)
		})
		return (
			<div className="assignment-list">
				{assignments}
			</div>
		)
	}
}

export default AssignmentList;
