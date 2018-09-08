import { createAction, handleActions } from 'redux-actions';
import submissionApi from '../../api/submissionApi';
import { createAsyncAction } from '../../utility/util'
import _ from 'lodash'
import RichTextEditor from 'commonComponents/RichTextEditor'

const uuid = require('uuid');

const GET_SUBMISSION = 'GET_SUBMISSION';
const START = 'START';
const SUBMIT = 'SUBMIT';

const CREATE_ANNOTATION = 'CREATE_ANNOTATION';
const ADD_ANNOTATION = 'ADD_ANNOTATION'
const UPDATE_ANNOTATION_NOTE = 'UPDATE_ANNOTATION_NOTE';
const DELETE_ANNOTATION = 'DELETE_ANNOTATION';
const CLEAR_SELECTED_ANNOTATION = 'CLEAR_SELECTED_ANNOTATION';

const SELECT_CODE_SNIPPET = 'SELECT_CODE_SNIPPET';
const CLEAR_SELECTED_CODE_SNIPPET = 'CLEAR_SELECTED_CODE_SNIPPET';

const POP_FLASH_MESSAGE = 'POP_FLASH_MESSAGE';
const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';

const SET_TIME_LEFT = 'SET_IS_TIME_OVER';

const SET_SUBMIT_BUTTON_CLICKED = 'SET_SUBMIT_BUTTON_CLICKED';
const SUBMIT_SUBMISSION = 'SUBMIT_SUBMISSION';

const GET_IS_USER_LOGGED_IN = 'GET_IS_USER_LOGGED_IN';

const LOGIN_CANDIDATE = 'LOGIN_CANDIDATE';
const LOGOUT_CANDIDATE = 'LOGOUT_CANDIDATE';

const SET_ID_AND_MODE = 'SET_ID_AND_MODE';

const GET_SNIPPET_AND_ANNOTATIONS = 'GET_SNIPPET_AND_ANNOTATIONS';

const START_ANNOTATION = 'START_ANNOTATION'
const CANCEL_ANNOTATION = 'CANCEL_ANNOTATION'

// ------------------------------------
// Actions
// Understand createAction from:
// https://github.com/reduxactions/redux-actions/blob/master/docs/api/createAction.md
// ------------------------------------

export const clearSelectedCodeSnippet = createAction(CLEAR_SELECTED_CODE_SNIPPET, () => null);
export const setTimeLeft = createAction(SET_TIME_LEFT, (timeLeft) => (timeLeft));
export const setSubmitButtonClicked = createAction(SET_SUBMIT_BUTTON_CLICKED, () => {});
export const setIdAndMode = createAction(SET_ID_AND_MODE, (id, mode) => ({id: id, mode: mode}));
export const addAnnotation = createAction(ADD_ANNOTATION, (annotation) => (annotation))
export const startAnnotation = createAction(START_ANNOTATION, (line) => (line))
export const cancelAnnotation = createAction(CANCEL_ANNOTATION, (line) => (line))

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

export const selectCodeSnippet = createAsyncAction(
  SELECT_CODE_SNIPPET,
  (id, state, dispatch) => {
      dispatch(getCodeSnippetAndAnnotations(id))
    return id
  }
)

export const submit = createAsyncAction(
  SUBMIT,
  (state, dispatch) => {
    let submissionId = state.submission._id
    return submissionApi.submit(submissionId).then(
      response => {
        if (response.error) throw response.error.message
        return response.submitTimestamp
      }, error => {
        throw error
      }
    )
  }
);

// Async Actions:
export const getSubmission = createAsyncAction(
  GET_SUBMISSION,
  (state, dispatch) => {
    let submissionId = state.submission._id
    return submissionApi.getSubmission(submissionId).then(
      response => {
        if (response.error) {
          return null
        }
        return response
      }, error => {
        throw error
      }
    )
  }
);

export const getCodeSnippetAndAnnotations = createAsyncAction(
  GET_SNIPPET_AND_ANNOTATIONS,
  (codeSnippetId, state, dispatch) => {
    let submissionId = state.submission._id
    return submissionApi.getCodeSnippetAndAnnotations(submissionId, codeSnippetId).then(
      response => {
        // check if object, because in success case response is an array of annotations.
        if (typeof response === 'object' && response.error) {
          return null;
        }
        return response
      }, error => {
        dispatch(flashMessage('Failed to get annotations for this code snippet. Please check your network connection and try again.', 'red'))
        throw error
      }
    )
  }
);

export const checkIfUserLoggedInAndGetSubmission = createAsyncAction(
  GET_IS_USER_LOGGED_IN,
  (state, dispatch) => {
    return submissionApi.isUserLoggedIn().then(
      response => {
        if (response) {
          // means user is logged in:
          dispatch(getSubmission())
        }
        return response
      }, error => {
        // could not pull for some reason...
        callback(false)
        throw error
      }
    )
  }
);

export const loginCandidate = createAsyncAction(
  LOGIN_CANDIDATE,
  (unlockPassword, state, dispatch) => {
    let submissionId = state.submission._id
    return submissionApi.loginCandidate(submissionId, unlockPassword).then(
      response => {
        // if there is a response, means it didn't error out ==> candidate is now
        // logged in. Time to fetch the submission object to show the candidate
        // the assignment.
        if (response.success) dispatch(getSubmission())
        else if (response.error) throw "There was an issue logging in. Make sure the unlock password you entered is correct, and that your internet connection is working."
        return response
      }, error => {
        throw error
      }
    )
  }
);

export const logoutCandidate = createAsyncAction(
  LOGOUT_CANDIDATE,
  (state, dispatch) => {
    return submissionApi.logoutCandidate().then(
      response => {
        // reload the page:
        location.reload()
        return 
      }, error => {
        throw error
      }
    )
  }
);

export const startSubmission = createAsyncAction(
  START,
  (state, dispatch) => {
    let submissionId = state.submission._id
    return submissionApi.start(submissionId).then(
      response => {
        if (response.error) {
          // this is the success case:
          dispatch(flashMessage('Failed to start assignment. Please check your network connection and try again.', 'red'))
        }
        return response.startTimestamp
      }, error => {
        dispatch(flashMessage('Failed to start assignment. Please check your network connection and try again.', 'red'))
      }
    )
  }
);

// TODO: update to match the new Annotation model (line not range)
export const createAnnotation = createAsyncAction(
  CREATE_ANNOTATION,
  (line, noteText, state, dispatch) => {
    // first get the required args from state: you can access 'getState' func
    // that createAsyncAction provides!
    let id = uuid.v1()
    let submissionId = state.submission._id
    let newAnnotation = {
      _id: id,
      line: line,
      noteText: noteText,
    }

    dispatch(addAnnotation(newAnnotation))
    // remove the newNote from the map (since it is now an annotation):
    dispatch(cancelAnnotation(line))
    // make call to server:
    submissionApi.createAnnotation(submissionId, state.submission.selectedCodeSnippetId, newAnnotation).then(
      response => {
        dispatch(flashMessage('Successfully saved!'))
      }, error => {
        dispatch(flashMessage('Failed to save annotation. Check your connection and please try again.'))
      }
    )

    return newAnnotation
  }
);

export const deleteAnnotation = createAsyncAction(
  DELETE_ANNOTATION,
  (annotationId, state, dispatch) => {
    // first get the required args from state: you can access 'getState' func
    // that createAsyncAction provides!
    let submissionId = state.submission._id
    // make call to server:
    submissionApi.deleteAnnotation(submissionId, annotationId).then(
      response => {
        dispatch(flashMessage('Successfully deleted annotation!'))
      }, error => {
        dispatch(flashMessage('Failed to delete annotation. Check your connection and please try again.', 'red'))
      }
    )
  }
);

export const updateAnnotationNoteText = createAsyncAction(
  UPDATE_ANNOTATION_NOTE,
  (annotationId, noteText, state, dispatch) => {
    // first get the required args from state: you can access 'getState' func
    // that createAsyncAction provides!
    let submissionId = state.submission._id

    // make call to server:
    submissionApi.updateAnnotationNoteText(submissionId, annotationId, noteText).then(
      response => {
        dispatch(flashMessage('Successfully updated annotation!'))
      }, error => {
        dispatch(flashMessage('Failed to update your annotation. Check your connection and please try again.', 'red'))
      }
    )
  }
);

export const actions = {
  getSubmission,

  startAnnotation,
  cancelAnnotation,
  createAnnotation,
  updateAnnotationNoteText,
  deleteAnnotation,

  flashMessage,
  setTimeLeft,
  setSubmitButtonClicked,
  submit,
  checkIfUserLoggedInAndGetSubmission,
  loginCandidate,
  logoutCandidate,
  startSubmission,
  setIdAndMode,
  getCodeSnippetAndAnnotations,
  selectCodeSnippet,
  clearSelectedCodeSnippet
};

// ------------------------------------
// Reducers
// ------------------------------------
export const reducers = {
  [(SET_ID_AND_MODE)]: (state, { payload }) => {
    return {
      ...state,
      _id: payload.id,
      mode: payload.mode
    }
  },

  [(GET_IS_USER_LOGGED_IN + '_STARTED')]: (state, { payload }) => {
    return {
      ...state,
      fetching: true
    }
  },
  [(GET_IS_USER_LOGGED_IN + '_ENDED')]: (state, { payload }) => {
    return {
      ...state,
      fetching: false,
      isUserLoggedIn: payload
    }
  },

  [(LOGIN_CANDIDATE + '_STARTED')]: (state, { payload }) => {
    return {
      ...state,
      fetching: true
    }
  },
  [(LOGIN_CANDIDATE + '_ENDED')]: (state, { payload }) => {
    return {
      ...state,
      isUserLoggedIn: true
    }
  },
  [(LOGIN_CANDIDATE + '_FAILED')]: (state, { payload }) => {
    return {
      ...state,
      isUserLoggedIn: false,
      fetching: false,
      loginError: payload
    }
  },
  [(LOGOUT_CANDIDATE + '_STARTED')]: (state, { payload }) => {
    return {
      ...state,
      fetching: true
    }
  },
  [(LOGOUT_CANDIDATE + '_ENDED')]: (state, { payload }) => {
    // do a page reload here:
    window.location.href = '#/submission/' + state._id + '/' + 'not-logged-in'
    return {
      ...state,
      fetching: false
    }
  },
  [(LOGOUT_CANDIDATE + '_ERROR')]: (state, { payload }) => {
    return {
      ...state,
      isUserLoggedIn: false,
      fetching: false
    }
  },

  [(GET_SUBMISSION + '_STARTED')]: (state, { payload }) => {
    return {
      ...state,
      fetching: true,
      submissionFetchingError: false
    }
  },
  [(GET_SUBMISSION + '_FAILED')]: (state, { payload }) => {
    return {
      ...state,
      submissionFetchingError: true
    }
  },
  [(GET_SUBMISSION + '_ENDED')]: (state, { payload }) => {
    if (!payload) return state;

    let currentTime = Date.now();
    let numSecondsLeft = (payload.startTimestamp > 0) ?
      payload.assignment.timeLimit - ((currentTime - payload.startTimestamp)/1000) : -1;

    return {
      ...state,

      _id: payload._id,
      isStarted: payload.isStarted,
      isSubmitted: payload.isSubmitted,
      startTimestamp: payload.startTimestamp,
      submitTimestamp: payload.submitTimestamp,

      assignmentId: payload.assignment._id,
      assignmentTitle: payload.assignment.title,
      assignmentPreStartMessage: payload.assignment.preStartMessage,
      assignmentPostSubmitMessage: payload.assignment.postSubmitMessage,
      codeSnippets: payload.assignment.codeSnippets,
      assignmentInstructions: payload.assignment.instructions,
      assignmentTimeLimit: payload.assignment.timeLimit,
      assignmentCreatedAt: payload.assignment.createdAt,

      candidateFirstName: payload.candidate.firstName,
      candidateLastName: payload.candidate.lastName,

      ownerFirstName: payload.owner.firstName,
      ownerLastName: payload.owner.lastName,

      timeLeft: Math.ceil(numSecondsLeft),
      fetching: false,
    };
  },

  [(GET_SNIPPET_AND_ANNOTATIONS + '_STARTED')]: (state, { payload }) => {
    return {
      ...state,
      isFetchingAnnotationsForCodeSnippet: true, 
      newNoteMap: {}
    };
  },

  [(GET_SNIPPET_AND_ANNOTATIONS + '_FAILED')]: (state, { payload }) => {
    return {
      ...state,
      isFetchingAnnotationsForCodeSnippet: false,
    };
  },

  [(GET_SNIPPET_AND_ANNOTATIONS + '_ENDED')]: (state, { payload }) => {
    // generate annotationMap:
    let annotationMap = {}
    payload.annotations.map((annotation) => {
      annotationMap[annotation._id] = annotation;
    });

    return {
      ...state,
      selectedCodeSnippetString: payload.snippet,
      selectedCodeSnippetTitle: payload.title,
      annotationMap: annotationMap,
      isFetchingAnnotationsForCodeSnippet: false
    }
  },

  [(SELECT_CODE_SNIPPET + '_ENDED')]: (state, { payload }) => {
    return {
      ...state, 
      selectedCodeSnippetId: payload,
    }
  },
  [(CLEAR_SELECTED_CODE_SNIPPET)]: (state, { payload }) => {
    return {
      ...state,
      selectedCodeSnippetId: null,
      selectedCodeSnippetString: "",
      annotationMap: {}
    };
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
  [(SET_TIME_LEFT)]: (state, { payload }) => {
    return {...state, timeLeft: payload};
  },
  [(SET_SUBMIT_BUTTON_CLICKED)]: (state, { }) => {
    return {...state, submitButtonClickedOnce: true};
  },
  [(SUBMIT_SUBMISSION)]: (state, { }) => {
    return state;
  },
  [(START + '_STARTED')]: (state, { payload }) => {
    return {
      ...state,
      fetching: true
    }
  },
  [(START + '_ENDED')]: (state, { payload }) => {
    let startTimestamp = payload
    let numSecondsLeft = state.assignmentTimeLimit -
      ((Date.now() - startTimestamp)/1000)
    return {
      ...state,
      isStarted: true,
      startTimestamp: payload,
      timeLeft: Math.ceil(numSecondsLeft),
      fetching: false
    }
  },
  [(SUBMIT + '_STARTED')]: (state, { payload }) => {
    let submitTimestamp = payload
    return {
      ...state,
      fetching: true
    };
  },
  [(SUBMIT + '_ENDED')]: (state, { payload }) => {
    let submitTimestamp = payload
    return {
      ...state,
      isSubmitted: true,
      submitTimestamp, payload,
      fetching: false
    };
  },
  [(ADD_ANNOTATION)]: (state, { payload }) => {
    // payload is the new annotation:
    // TODO: create separate reducer for clearing highlights.
    return {
      ...state,
      annotationMap: {
        ...state.annotationMap,
        [payload._id]: payload
      }
    }
  },
  [(UPDATE_ANNOTATION_NOTE + '_STARTED')]: (state, { payload}) => {
    let annotationId = payload[0]
    let noteText = payload[1]
    return {
      ...state,
      annotationMap: {
        ...state.annotationMap,
        [annotationId]: {
          ...state.annotationMap[annotationId],
          noteText: noteText
        }
      },
      lastModifiedAnnotationId: annotationId
    }
  },
  [(DELETE_ANNOTATION + '_STARTED')]: (state, { payload }) => {
    let annotationId = payload[0]
    return {
      ...state,
      annotationMap: _.omit(state.annotationMap, annotationId),
    }
  },
  [(START_ANNOTATION)]: (state, { payload }) => {
    return {
      ...state,
      newNoteMap: {
        ...state.newNoteMap,
        [payload]: true
      }
    }
  },
  [(CANCEL_ANNOTATION)]: (state, { payload }) => {
    return {
      ...state,
      newNoteMap: _.omit(state.newNoteMap, payload)
    }
  },
};

// State:
export const initialState = {

  // FLATTENED ASSIGNMENT:
  assignmentInstructions: "",
  assignmentTimeLimit: 0,
  assignmentCreatedAt: null,
  assignmentIsDemo: false,
  assignmentId: null,
  assignmentTitle: "",
  assignmentPreStartMessage: "",
  assignmentPostSubmitMessage: "",

  // CODE SNIPPET
  selectedCodeSnippetId: null,
  selectedCodeSnippetString: "",
  selectedCodeSnippetTitle: "",

  // OWNER
  ownerFirstName: "",
  ownerLastName: "",

  // CANDIDATE
  candidateFirstName: "",
  candidateLastName: "",

  // SUBMISSION:
  _id: '',
  isStarted: false,
  isSubmitted: false,
  startTimestamp: null,
  submitTimestamp: null,

  annotationMap: {},
  newNoteMap: {},
  codeSnippets: [],
  lastModifiedAnnotationId: null,

  isUserLoggedIn: false,
  loginError: "",

  mode: '',
  urlMode: '',

  // FETCHING STATES
  fetching: false,
  isFetchingAnnotationsForCodeSnippet: false,

  submitButtonClickedOnce: false,
  timeLeft: -1,
  flashMessages: [],
};

export default handleActions(reducers, initialState);
