import React, { Component } from 'react';

import AlreadySubmitted from '../AlreadySubmitted'
import NotStarted from '../NotStarted'
import SubmitSubmission from '../SubmitSubmission'
import NotLoggedIn from '../NotLoggedIn'

// props: all parent props.
// NOTE: props.assignment._id - is used to determine if the submission has been fetched from the server or not.
class InActiveSubmissionContainer extends Component {
	render() {
		let props = this.props
	    if (!props.general.isUserLoggedIn) {
			return (
				<NotLoggedIn
					loginCandidate={props.loginCandidate}
					loginError={props.general.loginError}
				/>
			);
	    }
	    if (props.submission.isSubmitted) {
			return (
				<AlreadySubmitted 
					candidate={props.candidate} 
					submitTimestamp={props.submission.submitTimestamp} 
					assignmentPostSubmitMessage={props.assignment.postSubmitMessage}
				/>
			);
	    }
	    if (!props.submission.isStarted && props.assignment._id) {
	    	return (
				<NotStarted
					candidate={props.candidate}
					owner={props.owner}
					assignmentTitle={props.assignment.title}
					assignmentPreStartMessage={props.assignment.preStartMessage}
					startSubmission={props.startSubmission}
					assignmentTimeLimit={props.assignment.timeLimit}
				/>
	    	);
	    }
	    if (props.general.timeLeft <= 0 && props.assignment._id) {
	    	return (
				<SubmitSubmission
					timeLeft={-1}
					submit={props.submit}
					setSubmitButtonClicked={props.setSubmitButtonClicked}
					submitButtonClickedOnce={props.general.submitButtonClickedOnce}
				/>
	    	);
	    }

	    return null;
	}
}

export default InActiveSubmissionContainer;
