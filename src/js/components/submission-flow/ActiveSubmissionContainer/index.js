import React, { Component } from 'react';

import CodeAnnotation from '../CodeAnnotation'
import Instructions from '../Instructions'
import SubmitSubmission from '../SubmitSubmission'

import ForwardBackNavigation from '../ForwardBackNavigationBar'

import AssignmentTopBar from '../AssignmentTopBar'

// (have access to all top-level props), PLUS the following:
// - modeNumber --> this determines what component is renderred:
// - numElements
class ActiveSubmissionContainer extends Component {
	wrapEssentials(comp) {
	    let props = this.props;
	    let candidateFullName = (props.candidate) ? props.candidate.firstName + " " + props.candidate.lastName : ''

	    return (
	    	<div>
		        <AssignmentTopBar
		          currentPosition={props.modeNumber}
		          goToPosition={props.goToPosition}
		          numElements={props.numElements} />

		        {comp}

		        <ForwardBackNavigation
		          position={props.modeNumber}
		          numElements={props.numElements}
		          incPosition={() => props.goToPosition(props.modeNumber + 1)}
		          decPosition={() => props.goToPosition(props.modeNumber - 1)} />
	      	</div>
	    );
 	}

	render() {
		let props = this.props;
		let x = this.props.modeNumber;
		let n = this.props.numElements;

		// instructions section:
		if (x === 0) return this.wrapEssentials(
			<Instructions 
				assignmentInstructions={props.assignment.instructions}
				candidateName={(props.candidate) ? props.candidate.firstName : ''}
			/>
		);

		// submit section:
		if (x === (n - 1)) {
			return this.wrapEssentials(      
				<SubmitSubmission
			        timeLeft={props.general.timeLeft}
			        submit={props.submit}
			        setSubmitButtonClicked={props.setSubmitButtonClicked}
			        submitButtonClickedOnce={props.general.submitButtonClickedOnce}
			    />
		    );
		}

    	// render a code snippet:
		if (x > 0 && x < (n - 1)) {
			// code snippet:
			// no need to specify which code snippet specifically. That should be set in 'selectedCodeSnippetId' in the store already
			// (by the parent component).
			return (
				this.wrapEssentials(
					<CodeAnnotation
						codeSnippetId={props.general.selectedCodeSnippetId}
						codeSnippetString={props.general.selectedCodeSnippetString}
						codeSnippetTitle={props.general.selectedCodeSnippetTitle}
						candidateFullName={props.candidate.firstName + ' ' + props.candidate.lastName}
						lastModifiedAnnotationId={props.general.lastModifiedAnnotationId}

						annotationMap={props.annotationMap}
						newNoteMap={props.newNoteMap}

						startAnnotation={props.startAnnotation}
						cancelAnnotation={props.cancelAnnotation}
						createAnnotation={props.createAnnotation}
						deleteAnnotation={props.deleteAnnotation}
						updateAnnotationNoteText={props.updateAnnotationNoteText}

						isFetchingAnnotationsForCodeSnippet={props.general.isFetchingAnnotationsForCodeSnippet}
					/>
				)
	        )
		}
  	}
}

export default ActiveSubmissionContainer;
