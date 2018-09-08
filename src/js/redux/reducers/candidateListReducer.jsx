import { createAction, handleActions } from 'redux-actions';
import { createAsyncAction } from 'utility/util'
import DashboardApi from 'api/dashboardApi';
import Actions from '../actions';

import _ from 'lodash'

import { SET_ASSIGN_TO_CANDIDATE_MODAL_VISIBILITY } from 'constants'

export const setAssignToCandidateModalVisibility = createAction(SET_ASSIGN_TO_CANDIDATE_MODAL_VISIBILITY, (isVisible) => (isVisible))

export const assignToCandidate = createAsyncAction(
	Actions.candidate.list.GET_CANDIDATES,
	() => {
		return DashboardApi.getCandidates().then(
			response => {
				if (response.error) {
					return null;
				}
				return response;
			}, error => {
				throw error;
			}
		)
	}
)
export const actions = {
  assignToCandidate,
  setAssignToCandidateModalVisibility
};

export const reducers = {
	[Actions.candidate.list.GET_CANDIDATES + '_STARTED']: (state, { payload }) => {
	    return {
			...state,
			fetching: true,
	    }
	},
	[Actions.candidate.list.GET_CANDIDATES]: (state, { payload }) => {
		return {
			...state,
			candidates: payload,
			fetching: false,
	    }
	}
};

export const initialState = {
	candidates: [],
	fetching: false
};

export default handleActions(reducers, initialState);