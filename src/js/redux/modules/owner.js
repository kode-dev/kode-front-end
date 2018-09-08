import { createAction, handleActions } from 'redux-actions';
import { createAsyncAction } from '../../utility/util'
import ownerApi from '../../api/ownerApi';
import submissionApi from '../../api/submissionApi'

import _ from 'lodash'

const GET_LOGGED_IN_OWNER = 'GET_LOGGED_IN_OWNER';
const SET_OWNER = 'SET_OWNER';
const GET_ASSIGNMENT = 'GET_ASSIGNMENT';
const GET_RESPONSE = 'GET_RESPONSE';
const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT';
const CREATE_DEMO_ASSIGNMENT = 'CREATE_DEMO_ASSIGNMENT';
const GET_ASSIGNMENT_LIST = 'GET_ASSIGNMENT_LIST';
const GET_RESPONSE_LIST = 'GET_RESPONSE_LIST';
const GET_RESPONSES_FOR_ASSIGNMENT = 'GET_RESPONSES_FOR_ASSIGNMENT'

const POP_FLASH_MESSAGE = 'POP_FLASH_MESSAGE';
const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';

const SET_ASSIGN_TO_CANDIDATE_MODAL_VISIBILITY = 'SET_ASSIGN_TO_CANDIDATE_MODAL_VISIBILITY'
const ASSIGN_TO_CANDIDATE = 'ASSIGN_TO_CANDIDATE'

const GET_SNIPPET_INFO_AND_ANNOTATIONS = 'GET_SNIPPET_INFO_AND_ANNOTATIONS'

// ------------------------------------
// Actions
// ------------------------------------
export const setAssignToCandidateModalVisibility = createAction(SET_ASSIGN_TO_CANDIDATE_MODAL_VISIBILITY, (isVisible) => (isVisible))

export const assignToCandidate = createAsyncAction(
	ASSIGN_TO_CANDIDATE,
	(firstName, lastName, unlockPassword, state, dispatch) => {
		let assignmentId = state.owner.assignment._id
		return ownerApi.assignToCandidate(assignmentId, firstName, lastName, unlockPassword).then(
			response => {
				if (response.error) {
					return null
				}
				return response
			}, error => {
				flashMessage('There was an error assigning to your candidate. Check your internet and try again.')
				throw error
			}
		)
	}
)

export const flashMessage = (message, color) => {
  return async(dispatch, state) => {
    dispatch({
      type: ADD_FLASH_MESSAGE,
      payload: {
        message: message,
        color: color
      }
    });
    setTimeout(() => {
      // let's pop of
      dispatch({
        type: POP_FLASH_MESSAGE,
        payload: {}
      })
    }, 7000);
  }
};

export const getLoggedInOwner = createAsyncAction(
	GET_LOGGED_IN_OWNER,
	(state, dispatch) => {
		return ownerApi.getLoggedInOwner().then(
			response => {
				if (response.error) {
					return null
				}
				return response
			}, error => {
				flashMessage('Error getting the logged in user. Check your internet and try again.')
				throw error
			}
		)
	}
)

export const getAssignmentList = createAsyncAction(
	GET_ASSIGNMENT_LIST, 
	(state, dispatch) => {
		return ownerApi.getAssignmentList().then(
			response => {
				if (response.error) {
					return null
				}
				return response
			}, error => {
				flashMessage('Error getting your created assignments. Check your internet and try again.')
				throw error
			}
		)
	}
)

export const getResponseList = createAsyncAction(
	GET_RESPONSE_LIST, 
	(state, dispatch) => {
		return ownerApi.getResponseList().then(
			response => {
				if (response.error) {
					return null
				}
				return response
			}, error => {
				flashMessage('Error getting all responses for the assignments you created. Check your internet and please try again.')
				throw error
			}
		)
	}
)

export const getResponsesForAssignment = createAsyncAction(
	GET_RESPONSES_FOR_ASSIGNMENT,
	(assignmentId, state, dispatch) => {
		return ownerApi.getResponsesForAssignment(assignmentId).then(
			response => {
				if (response.error) {
					return null
				}
				return response
			}, error => {
				flashMessage('Error getting responses for this assignment. Check your internet and please try again.')
				throw error
			}
		)
	}
)

export const getAssignment = createAsyncAction(
	GET_ASSIGNMENT, 
	(id, state, dispatch) => {
		return ownerApi.getAssignment(id).then(
			response => {
				if (response.error) {
					return null
				}
				return response
			}, error => {
				flashMessage('Error fetching the assignment details')
				throw error
			}
		)
	}
)

export const getSubmission = createAsyncAction(
	GET_RESPONSE, 
	(id, state, dispatch) => {
		return ownerApi.getResponse(id).then(
			response => {
				if (response.error) {
					return null
				}
				return response
			}, error => {
				flashMessage('There was an error fetching assignment information')
				throw error
			}
		)
	}
)

export const createDemoAssignment = createAsyncAction(
	CREATE_DEMO_ASSIGNMENT,
	(assignment, state, dispatch) => {
		return ownerApi.createDemoAssignment(assignment).then(
			response => {
				if (response.error) {
					return null
				}
				// navigate to the demo assignment url: 
				window.open('/#/submission/' + response.submissionId)
			}, error => {
				flashMessage('There was an error demo-ing your assignment')
				throw error
			}
		)
	}
)

export const createAssignment = createAsyncAction(
	CREATE_ASSIGNMENT,
	(assignment, state, dispatch) => {
		return ownerApi.createAssignment(assignment).then(
			response => {
				if (response.error) {
					// when could we get an error here, without triggering the error path? 
					return null
				}
				// navigate to the assignment url: 
				window.location.href = '/#/assignment/' + response.assignmentId
			}, error => {
				flashMessage('There was an error creating your assignment')
				throw error
			}
		)
	}
)

export const getSnippetInfoAndAnnotations = createAsyncAction(
	GET_SNIPPET_INFO_AND_ANNOTATIONS,
	(submissionId, snippetId, state, dispatch) => {
		return ownerApi.getCodeSnippetAndAnnotationsForCandidate(submissionId, snippetId).then(
			response => {
				if (response.error) {
					// when could we get an error here, without triggering the error path? 
					return null
				}
				response.snippetId = snippetId
				return response
			}, error => {
				flashMessage("There was an error fetching the candidat's code review.")
				throw error
			}
		)
	}
)

export const actions = {
  getLoggedInOwner, 
  getResponseList, 
  getAssignmentList,
  getAssignment,
  getSubmission,
  createDemoAssignment,
  createAssignment,
  getResponsesForAssignment,
  assignToCandidate,
  setAssignToCandidateModalVisibility,
  getSnippetInfoAndAnnotations
};

export const reducers = {
	[GET_LOGGED_IN_OWNER + '_STARTED']: (state, { payload }) => {
	    return {
			...state,
			fetching: true,
	    }
	},
	[GET_LOGGED_IN_OWNER + '_ENDED']: (state, { payload }) => {
		return {
			...state,
			owner: payload,
			fetching: false,
	    }
	},
	[GET_ASSIGNMENT_LIST + '_STARTED']: (state, { payload }) => {
	    return {
			...state,
			fetching: true,
	    }
	},
	[GET_ASSIGNMENT_LIST + '_ENDED']: (state, { payload }) => {
	    return {
			...state,
			assignmentList: payload.assignments,
			fetching: false,
	    }
	},
	[GET_RESPONSE_LIST + '_STARTED']: (state, { payload }) => {
	    return {
			...state,
			fetching: true,
	    }
	},
	[GET_RESPONSE_LIST + '_ENDED']: (state, { payload }) => {
		let responses = payload.responses
		responses.filter((x) => (x.candidate && x.assignment))
	    return {
			...state,
			responseList: responses,
			fetching: false,
	    }
	},

	[GET_RESPONSES_FOR_ASSIGNMENT + '_STARTED']: (state, { payload }) => {
	    return {
			...state,
			fetchingResponsesForAssignment: true
	    }
	},

	[GET_RESPONSES_FOR_ASSIGNMENT + '_ENDED']: (state, { payload }) => {
		let responses = payload.responses
		responses = responses.filter((x) => (x.candidate && x.assignment))
	    return {
			...state,
			responsesForAssignment: responses,
			fetchingResponsesForAssignment: false
	    }
	},

	[CREATE_ASSIGNMENT + '_STARTED']: (state, { payload }) => {
	    return {
			...state,
			fetching: true,
	    }
	},
	[CREATE_DEMO_ASSIGNMENT + '_STARTED']: (state, { payload }) => {
	    return {
			...state,
			fetching: true,
	    }
	},

	[GET_ASSIGNMENT + '_STARTED']: (state, { payload }) => {
	    return {
			...state,
			fetching: true,
	    }
	},
	[GET_ASSIGNMENT + '_ENDED']: (state, { payload }) => {
	    return {
			...state,
			assignment: payload,
			fetching: false
	    }
	},

	[GET_RESPONSE + '_STARTED']: (state, { payload }) => {
	    return {
			...state,
			fetching: true,
	    }
	},
	[GET_RESPONSE + '_ENDED']: (state, { payload }) => {
	    return {
			...state,
			submission: payload,
			fetching: false
	    }
	},
	[GET_SNIPPET_INFO_AND_ANNOTATIONS + '_ENDED']: (state, { payload }) => {
	    // first create the annotationMap: 
	    let annotationMap = {}
	    for (var i = 0; i < payload.annotations.length; i++) {
	      let ann = payload.annotations[i]
	      annotationMap[ann.line] = ann
	    }

		return {
			...state,
			snippetToInfoAndAnnotations: {
				...state.snippetToInfoAndAnnotations,
				[payload.snippetId]: {
					annotationMap: annotationMap,
					snippet: payload.snippet,
					title: payload.title
				}
			},
		}
	},

	[ASSIGN_TO_CANDIDATE + '_STARTED']: (state, { payload }) => {
		return {
			...state, 
			isAssigningToCandidate: true
		}
	},
	[ASSIGN_TO_CANDIDATE + '_ENDED']: (state, { payload }) => {
		return {
			...state, 
			isAssigningToCandidate: false,
			assignedSubmissionId: payload.responseId,
			assignedCandidateFirstName: payload.candidate.firstName,
			assignedCandidateLastName: payload.candidate.lastName,
			assignedUnlockPassword: payload.unlockPassword,
		}
	},
	[SET_ASSIGN_TO_CANDIDATE_MODAL_VISIBILITY]: (state, { payload }) => {
		if (payload) {
			return {
				...state,
				isAssignToCandidateModalVisible: true
			}
		} else {
			// when closing the modal, get rid of all assigned to candidate state. 
			// (next time user opens modal, it should be fresh - so that they can assign to a new candidate)
			return {
				...state,
				isAssignToCandidateModalVisible: false,
				assignedSubmissionId: "",
				assignedCandidateLastName: "",
				assignedCandidateFirstName: "",
				assignedUnlockPassword: ""
			}
		}
	}, 
	[(ADD_FLASH_MESSAGE)]: (state, { payload }) => {
		let newFlashMessages = state['flashMessages'].concat({
			message: payload.message,
			color: payload.color
		});
		return {
			...state,
			flashMessages: newFlashMessages
		};
	},
	[(POP_FLASH_MESSAGE)]: (state, { payload }) => {
		let flashMessages = state['flashMessages'];
		// remove the last flash message:
		return {
			...state,
			flashMessages: flashMessages.filter((x, i) => i !== flashMessages.length - 1)
		}
	},
};

export const initialState = {
	owner: {},
	flashMessages: [],
	fetching: false,
	assignmentList: [],
	responseList: [],

	snippetToInfoAndAnnotations: {},

	assignment: {},
	responsesForAssignment: [],

	submission: {},
	fetchingResponsesForAssignment: false,

	// assigning to candidate related state:
	isAssigningToCandidate: false,
	isAssigninToCandidateModalVisible: false,
	assignedSubmissionId: "",
	assignedCandidateFirstName: "",
	assignedCandidateLastName: "",
	assignedUnlockPassword: ""
};

export default handleActions(reducers, initialState);