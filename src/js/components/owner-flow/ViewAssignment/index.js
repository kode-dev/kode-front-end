import React, { Component } from 'react';
import LoadingSpinner from 'commonComponents/LoadingSpinner'
import ViewCode from '../ViewCode'
import ResponseList from '../ResponseList'
import { getHumanReadableTime } from 'utility/util'

import AssignToCandidateModal from '../AssignToCandidateModal'

import RichTextEditor from 'commonComponents/RichTextEditor'

import { Button, Grid, Row, Col, Clearfix, ControlLabel } from 'react-bootstrap'

import './style.css'

// what are the things this component has to render? 
// - title
// - instructions
// - codeSnippets[]
// - longFormQuestion
// - timeLimit
// - createdAt
// - candidatesForAssignment

// props: 
// - assignmentId
// - assignment
// - responsesForAssignment
class ViewAssignment extends Component {

	componentDidMount() {
		// fetch the assignment:
		this.props.getAssignment(this.props.assignmentId)
		this.props.getResponsesForAssignment(this.props.assignmentId)
	}

	render() {
		if (this.props.general.fetching) return (<LoadingSpinner />);
		let assignment = this.props.assignment

		// before getAssignment() is called and fetching is still false (split second):
		if (!assignment._id) return null

		// TODO: need to customize this by language (Prism formatting would change...)
		let codeSnippets = assignment.codeSnippets.map((snippet, i) => {
			if (!snippet.snippet || !snippet.title) return null
			return (
				<div className="assignment-section">	
					<ControlLabel>{snippet.title}</ControlLabel>
					<ViewCode key={i} language={snippet.language} code={snippet.snippet} />
				</div>
			)
		})

		let responseSection = ''
		if (this.props.general.fetchingResponsesForAssignment) {
			responseSection = (<LoadingSpinner />)
		} else {
			if (this.props.general.responsesForAssignment.length === 0) {
				responseSection = (
					<div className="responses-for-assignment-message">
						<p>This assignment hasn't been assigned to anyone yet.</p>
					</div>
				)
			} else {
				responseSection = (
					<div className="responses-for-assignment">
						<ResponseList 
							history={this.props.history}
							responses={this.props.general.responsesForAssignment}
						/>
					</div>
				)
			}
		}
		return (
			<Grid>
				<h2>{assignment.title}</h2>

				<Row>
					<Col xs={12} md={8} className="view-assignment-container">
						<div className="assignment-section">
							<p><b>Created:</b> {getHumanReadableTime(assignment.createdAt)} </p>
							<p><b>Time limit:</b> {assignment.timeLimit / 60} minutes</p>
						</div>

						<div className="assignment-section">
							<ControlLabel>Message to Candidate</ControlLabel>
							<p className="label-caption">Candidates see this message before they start the assignment.</p>
							<RichTextEditor readOnly={true} value={RichTextEditor.createValueFromString(assignment.preStartMessage, 'html')} />
						</div>

						<div className="assignment-section">
							<ControlLabel>Instructions</ControlLabel>
							<p className="label-caption">Candidates see this message as soon as they start their assignment.</p>
							<RichTextEditor readOnly={true} value={RichTextEditor.createValueFromString(assignment.instructions, 'html')} />
						</div>

						<h3><b>Code</b></h3>
						{codeSnippets}

						<div className="assignment-section">
							<ControlLabel>Post Submit Message</ControlLabel>
							<p className="label-caption">Candidates see this message after they submit their assignment. You could explain how you would have reviewed the code, and/or what the next steps are.</p>
							<RichTextEditor readOnly={true} value={RichTextEditor.createValueFromString(assignment.postSubmitMessage, 'html')} />
						</div>
					</Col>

					<Col xs={6} md={4} className="assigned-to-panel">
						<Button bsStyle="primary" onClick={() => this.props.setAssignToCandidateModalVisibility(true)}>Assign to Candidate</Button>
						<AssignToCandidateModal 
							assignmentTitle={assignment.title}
							isAssigningToCandidate={this.props.assign.isAssigningToCandidate}
							isAssignToCandidateModalVisible={this.props.assign.isAssignToCandidateModalVisible}
							assignedSubmissionId={this.props.assign.assignedSubmissionId}
							assignedCandidateFirstName={this.props.assign.assignedCandidateFirstName}
							assignedCandidateLastName={this.props.assign.assignedCandidateLastName}
							assignedUnlockPassword={this.props.assign.assignedUnlockPassword}

							assignToCandidate={this.props.assignToCandidate}
							setAssignToCandidateModalVisibility={this.props.setAssignToCandidateModalVisibility}
						/>
						{responseSection}
					</Col>

				</Row>


			</Grid>
		);
	}
}

export default ViewAssignment;
