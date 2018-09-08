import { createSelector } from 'reselect';
// READ: https://github.com/reactjs/reselect

const ownerObjSelector = createSelector(
  state => state.owner,
  state => {
    return state.owner
  }
)

const generalStateSelector = createSelector(
	state => state.owner,
	state => {
		return {
			flashMessages: state.flashMessages,
			fetching: state.fetching,
			assignmentList: state.assignmentList,
			responseList: state.responseList,
			responsesForAssignment: state.responsesForAssignment,
			fetchingResponsesForAssignment: state.fetchingResponsesForAssignment,
			snippetToInfoAndAnnotations: state.snippetToInfoAndAnnotations
		}
	}
)

const selectedAssignmentSelector = createSelector(
	state => state.owner,
	state => {
		return state.assignment
	}
)

const selectedSubmisionSelector = createSelector(
	state => state.owner,
	state => {
		let submission = state.submission
		// TODO: put the link generating logic util.
		if (submission.id)	{ submission.link = 'https://kodereview.com/#/submission/' + submission.id }
		return submission
	}
)

const assignedToCandidateSelector = createSelector(
	state => state.owner,
	state => {
		return {
			isAssigningToCandidate: state.isAssigningToCandidate,
			isAssignToCandidateModalVisible: state.isAssignToCandidateModalVisible,
			assignedSubmissionId: state.assignedSubmissionId,
			assignedCandidateFirstName: state.assignedCandidateFirstName,
			assignedCandidateLastName: state.assignedCandidateLastName,
			assignedUnlockPassword: state.assignedUnlockPassword
		}
	}
)

export const ownerSelector = state => ({
  owner: ownerObjSelector(state),
  general: generalStateSelector(state),
  assignment: selectedAssignmentSelector(state),
  submission: selectedSubmisionSelector(state),
  assign: assignedToCandidateSelector(state)
});