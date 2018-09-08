import React, { Component } from 'react';
import LoadingSpinner from 'commonComponents/LoadingSpinner'
import SubmissionProgressStateSpan from '../SubmissionProgressStateSpan'
import ViewCodeReview from '../ViewCodeReview'

import './style.css'

import { getHumanReadableTime } from 'utility/util'

class ViewSubmission extends Component {
	constructor(props) {
		super(props)

		this.getMetaDataSection = this.getMetaDataSection.bind(this)
		this.getCodeReviewSection = this.getCodeReviewSection.bind(this)
	}

	componentDidMount() {
		this.props.getSubmission(this.props.submissionId)
	}

	// Share:
	// - progress state
	// - assigned timestamp
	// - submission-link to share with candidate (or message?)
	// - 
	getMetaDataSection() {
		let submission = this.props.submission
		if (!submission || !submission.assignment) return
		return (
			<div className="submission-metadata-container">
				<p >
					<b>{submission.candidate.firstName + " " + submission.candidate.lastName} </b> 
					<SubmissionProgressStateSpan isStarted={submission.isStarted} isSubmitted={submission.isSubmitted} /> 
					<b><a href={"/#/assignment/" + submission.assignment._id}> {submission.assignment.title}</a></b>
				</p>
				<p>Submitted on: {getHumanReadableTime(submission.submitTimestamp)}</p> 
				<p>Assigned on: {getHumanReadableTime(submission.createdAt)}</p>
				<p>{submission.candidate.firstName + "'s assignment link: "}<a href={"/#/submission/" + submission._id}>/#/submission/{submission._id}</a></p>
				<p>{submission.candidate.firstName + ' '} needs to enter <b>{submission.unlockPassword}</b> to unlock the assignment</p>
			</div>
		)
	}

	getCodeReviewSection() {
		let submission = this.props.submission;
		if (!submission || !submission.assignment) return
		if (!submission.isSubmitted) {
			return (
				<p>Candidate has not submitted their assignment yet. Please come back after they have, to see their code review</p>
			)
		}

		let reviewSection = submission.assignment.codeSnippets.map((snippetId, i) => (
			<ViewCodeReview 
				key={i}
				candidateFullName={submission.candidate.firstName + ' ' + submission.candidate.lastName}
				snippetId={snippetId} 
				submissionId={submission._id} 
				infoAndAnnotationMap={this.props.general.snippetToInfoAndAnnotations[snippetId]}
				getSnippetInfoAndAnnotations={this.props.getSnippetInfoAndAnnotations}
			/>
		))

		return reviewSection
	}

	render() {
		if (this.props.general.fetching) return <LoadingSpinner />
		let submission = this.props.submission
		if (!submission || !submission.assignment || !submission.candidate) return null
		
		return (
			<div className="view-submission-container">

				<div className="submission-metadata">	
					{this.getMetaDataSection()}
				</div>

				<div className="submission-kode-review">
					{this.getCodeReviewSection()}
				</div>
			</div>
		);
	}
}

export default ViewSubmission;
