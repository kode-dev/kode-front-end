import { createAction, handleActions } from 'redux-actions';
import { createAsyncAction } from 'utility/util'
import DashboardApi from 'api/dashboardApi';
import Actions from '../actions';

import _ from 'lodash'
import Immutable, { Map, List } from 'immutable';

export const fetchAssessments = createAsyncAction(
	Actions.assessment.list.FETCH_ASSESSMENTS,
	() => {
		return DashboardApi.getAssessmentList().then(
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
  	fetchAssessments
};

export const reducers = {
	[Actions.assessment.list.FETCH_ASSESSMENTS]: (state, { payload }) => {
	    return {
			...state,
			fetchingAssessments: true
	    };
	},
	[Actions.assessment.list.FETCH_ASSESSMENTS + '_SUCCESS']: (state, { payload }) => {
		return {
			...state,
			assessments: Immutable.fromJS(payload),
			fetchingAssessments: false
	    };
	},
	[Actions.assessment.list.FETCH_ASSESSMENTS + '_ERROR']: (state, { payload }) => {
		return {
			...state,
			assessments: Immutable.fromJS(payload),
			fetchingAssessments: false
	    };
	}
};

export const initialState = {
	assessments: new List(),
	fetchingAssessments: false
};

export default handleActions(reducers, initialState);