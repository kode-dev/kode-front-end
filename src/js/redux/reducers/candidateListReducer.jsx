import { createAction, handleActions } from 'redux-actions';
import { createAsyncAction } from 'utility/util'
import DashboardApi from 'api/dashboardApi';
import Actions from '../actions';

import _ from 'lodash'
import Immutable, { Map, List } from 'immutable';

export const fetchCandidates = createAsyncAction(
	Actions.candidate.list.FETCH_CANDIDATES,
	() => {
		return DashboardApi.getCandidateList().then(
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
);

export const addCandidate = createAsyncAction(
	Actions.candidate.list.ADD_CANDIDATE,
	() => {
		return DashboardApi.addCandidate().then(
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
);

export const actions = {
    fetchCandidates,
  	addCandidate
};

export const reducers = {
	[Actions.candidate.list.FETCH_CANDIDATES]: (state, { payload }) => {
	    return {
			...state,
			fetchingCandidates: true
	    };
	},
	[Actions.candidate.list.FETCH_CANDIDATES + '_SUCCESS']: (state, { payload }) => {
		return {
			...state,
			candidates: payload,
			fetchingCandidates: false
	    };
	},
	[Actions.candidate.list.FETCH_CANDIDATES + '_ERROR']: (state, { payload }) => {
		return {
			...state,
			candidates: Immutable.fromJS(payload),
			fetchingCandidates: false
	    };
	},
	[Actions.candidate.list.ADD_CANDIDATE]: (state, { payload }) => {
	    return state;
	},
	[Actions.candidate.list.ADD_CANDIDATE + '_SUCCESS']: (state, { payload }) => {
		return {
			...state,
			candidates: candidates.unshift(payload)
	    }
	},
	[Actions.candidate.list.ADD_CANDIDATE + '_ERROR']: (state, { payload }) => {
		return state;
	}
};

export const initialState = {
	candidates: new List(),
	fetchingCandidates: false
};

export default handleActions(reducers, initialState);