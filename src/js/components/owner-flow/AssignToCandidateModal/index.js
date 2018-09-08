import React, { Component } from 'react';
import LoadingSpinner from 'commonComponents/LoadingSpinner'

import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

import FormControlInput from 'commonComponents/FormControlInput'
import validations from './validations'

import { getSubmissionUrlFromId } from 'utility/util'

import './style.css'
// props:
// - assignToCandidate(firstName, lastName, unlockPassword)
// - isAssigningToCandidate (to determine whether to show a spinner or not)
// - isAssignToCandidateModalVisible (T/F)

// - assignedSubmissionId
// - assignedCandidateFirstName
// - assignedCandidateLastName
// - assignedUnlockPassword

// - assignmentTitle
// TODO: Put the assignmentTitle in the Modal Header string.
class AssignToCandidate extends Component {
	constructor(props){
		super(props)

		this.submit = this.submit.bind(this)
		this._clear = this._clear.bind(this)
		this._onHide = this._onHide.bind(this)

		this.state = {
			firstName: "",
			lastName: "",
			unlockPassword: "",
		}
	}

	_clear() {
		this.setState({firstName: "", lastName: "", unlockPassword: ""})
	}

	submit() {
		this.props.assignToCandidate(this.state.firstName, this.state.lastName, this.state.unlockPassword)
	}

	_onHide() {
		this._clear()
		this.props.setAssignToCandidateModalVisibility(false)
	}

	render() {

		let body = ''
		if (this.props.isAssigningToCandidate) {
			body = <LoadingSpinner />
		} else if (this.props.assignedSubmissionId && this.props.assignedCandidateFirstName) {
			// a candidate has just been assigned... render that here:
			body = (
				<div>
					<Modal.Body>
						<div className="assigned-to-candidate">
							<p>Assigned To: {this.props.assignedCandidateFirstName + ' ' + this.props.assignedCandidateLastName}</p>
							<p>Password to unlock assignment: {this.props.assignedUnlockPassword}</p>
							<p>Assignment url to share with candidate: {getSubmissionUrlFromId(this.props.assignedSubmissionId)}</p>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<ButtonToolbar>
							<Button onClick={this._onHide}>OK</Button>
						</ButtonToolbar>
					</Modal.Footer>
				</div>
			)
		} else {
			body = 	(
				<div className="assign-to-candidate-modal">
					<Modal.Body>
						<form>	
							<FormGroup controlId="candidateInfo">
								<ControlLabel>Candidate First name</ControlLabel>
								<FormControlInput
									maxLength={validations.nameLength}
									type="text"
									value={this.state.firstName}
									placeholder="John"
									onChange={(e) => this.setState({firstName: e.target.value})}
									/>
							</FormGroup>
							<FormGroup controlId="lastName">
								<ControlLabel>Candidate Last name</ControlLabel>
								<FormControlInput
									maxLength={validations.nameLength}
									type="text"
									value={this.state.lastName}
									placeholder="Appleseed"
									onChange={(e) => this.setState({lastName: e.target.value})}
									/>
							</FormGroup>
							<FormGroup controlId="unlockPasswordInfo">
								<ControlLabel>Assignment Unlock Password</ControlLabel>
								<HelpBlock>The password your candidate will need to enter, to start this assignment</HelpBlock>

								<FormControlInput
									maxLength={validations.unlockPassword}
									type="text"
									value={this.state.unlockPassword}
									placeholder="e.g. testUnlockPassword"
									onChange={(e) => this.setState({unlockPassword: e.target.value})}
								/>

							</FormGroup>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<ButtonToolbar>
							<Button onClick={this._onHide}>Cancel</Button>
							<Button bsStyle="primary" onClick={this.submit}>Assign</Button>
						</ButtonToolbar>
					</Modal.Footer>
				</div>
			)
		}

		return (
			<Modal show={this.props.isAssignToCandidateModalVisible} onHide={this._onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Assign <b>{this.props.assignmentTitle}</b> to a candidate</Modal.Title>
				</Modal.Header>
				{body}
			</Modal>
		)
	}
}

export default AssignToCandidate;
