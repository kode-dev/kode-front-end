import React, { Component } from 'react';
import AssignmentList from '../AssignmentList'
import ResponseList from '../ResponseList'

class Dashboard extends Component {
	componentDidMount() {
		this.props.getAssignmentList()
		this.props.getResponseList()
	}

	render() {
		return (
		  <div className="dashboard-container">
		    	<h2>Your Assignments</h2>
				<AssignmentList 
					history={this.props.history}
					assignments={this.props.general.assignmentList}
					fetching={this.props.general.fetching}
				/>

				<h2>Candidate Submissions</h2>
				<ResponseList 
					history={this.props.history}
					responses={this.props.general.responseList}
					fetching={this.props.general.fetching}
				/>
		  </div>
		);
	}
}

export default Dashboard;
