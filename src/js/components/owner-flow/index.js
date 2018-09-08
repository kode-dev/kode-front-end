import React, { Component } from 'react';
import Navbar from './OwnerNavbar'

import Dashboard from './Dashboard'
import CreateAssignment from './CreateAssignment'
import ViewAssignment from './ViewAssignment'
import ViewSubmission from './ViewSubmission'

import 'style/owner-flow.css'

class OwnerFlow extends Component {

	componentDidMount() {
		this.props.getLoggedInOwner()
	}

	render() {
		var comp = ''
		let path = this.props.match.path

		if (path === '/dashboard') {
			comp = <Dashboard {...this.props}/>
		} else if (path === '/create-assignment') {
			comp = <CreateAssignment {...this.props}/>
		} else if (this.props.match.path === '/assignment/:id') {
			comp = <ViewAssignment assignmentId={this.props.match.params.id} {...this.props}/>
		} else if (path === '/assignment-submission/:id') {
			comp = <ViewSubmission submissionId={this.props.match.params.id} {...this.props}/>
		}

		return (
			<div className="owner-container">

				<Navbar 
					ownerFirstName={(this.props.owner.firstName)}
					ownerLastName={(this.props.owner.lastName)}
					flashMessages={this.props.general.flashMessages}
					ownerEmail={(this.props.owner.email)}
					path={path}
				/>
				{comp}
			</div>
		);
	}
}

export default OwnerFlow;
