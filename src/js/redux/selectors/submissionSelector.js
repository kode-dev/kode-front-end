import { createSelector } from 'reselect';
// READ: https://github.com/reactjs/reselect

const generalStateSelector = createSelector(
  state => state.submission,
  state => {
    return {
      selectedCodeSnippetId: state.selectedCodeSnippetId,
      selectedCodeSnippetString: state.selectedCodeSnippetString,
      selectedCodeSnippetTitle: state.selectedCodeSnippetTitle,
      isUserLoggedIn: state.isUserLoggedIn,
      loginError: state.loginError,
      mode: state.mode,
      fetching: state.fetching,
      isFetchingAnnotationsForCodeSnippet: state.isFetchingAnnotationsForCodeSnippet,
      flashMessages: state.flashMessages,
      submitButtonClickedOnce: state.submitButtonClickedOnce,
      timeLeft: state.timeLeft,
      lastModifiedAnnotationId: state.lastModifiedAnnotationId
    }
  }
)

// TODO: find better name. Clashes with the submissionSelector() which puts all of these individual selectors together.
const submissionObjectSelector = createSelector(
  state => state.submission,
  state => {
    return {
      _id: state._id,
      isStarted: state.isStarted,
      isSubmitted: state.isSubmitted,
      startTimestamp: state.startTimestamp,
      submitTimestamp: state.submitTimestamp,
    }
  }
)

const assignmentSelector = createSelector(
  state => state.submission,
  state => {
    return {
      _id: state.assignmentId,
      instructions: state.assignmentInstructions,
      title: state.assignmentTitle,
      isDemo: state.assignmentIsDemo,
      preStartMessage: state.assignmentPreStartMessage,
      postSubmitMessage: state.assignmentPostSubmitMessage,
      timeLimit: state.assignmentTimeLimit,
      createdAt: state.assignmentCreatedAt,
      codeSnippets: state.codeSnippets
    }
  }
)

const candidateSelector = createSelector(
  state => state.submission,
  state => {
    return {
      firstName: state.candidateFirstName,
      lastName: state.candidateLastName
    }
  }
)

const ownerSelector = createSelector(
  state => state.submission,
  state => {
    return {
      firstName: state.ownerFirstName,
      lastName: state.ownerLastName
    }
  }
)

const annotationMap = createSelector(
  state => state.submission,
  state => {
    // need to map from line number to annotation object:
    let lineMap = {}
    for (var id in state.annotationMap) {
      let annotation = state.annotationMap[id]
      lineMap[annotation.line] = annotation
    }
    return lineMap
  }
)

const newNoteMap = createSelector(
  state => state.submission,
  state => {
    // need to map from line number to annotation object:
    return state.newNoteMap
  }
)
export const submissionSelector = state => ({
  submission: submissionObjectSelector(state),
  assignment: assignmentSelector(state),
  owner: ownerSelector(state),
  candidate: candidateSelector(state),
  general: generalStateSelector(state),
  annotationMap: annotationMap(state),
  newNoteMap: newNoteMap(state)
});
