import { createAction, handleActions } from 'redux-actions';
import { createAsyncAction } from 'utility/util'
import DashboardApi from 'api/dashboardApi';
import Actions from '../actions';

import _ from 'lodash'
import Immutable, { Map, List } from 'immutable';

export const fetchAppointments = createAsyncAction(
	Actions.Appointment.list.FETCH_APPOINTMENT,
	() => {
		return DashboardApi.getAppointmentList().then(
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

export const addAppointment = createAsyncAction(
	Actions.Appointment.list.ADD_APPOINTMENT,
	(newAppointment, callback) => {
		return DashboardApi.addAppointment(newAppointment).then(
			response => {
				if (response.error) {
					callback(null)
					return null;
				}
				callback(response)
				return response;
			}, error => {
				throw error;
			}
		)
	}
);

export const setNewAppointmentModalOpen(Actions.Appointment)

export const actions = {
    fetchAppointments,
  	addAppointment
};

export const reducers = {
	[Actions.Appointment.list.FETCH_APPOINTMENTS]: (state, { payload }) => {
	    return {
			...state,
			fetchingAppointments: true
	    };
	},
	[Actions.Appointment.list.FETCH_APPOINTMENTS + '_SUCCESS']: (state, { payload }) => {
		return {
			...state,
			Appointments: payload,
			fetchingAppointments: false
	    };
	},
	[Actions.Appointment.list.FETCH_APPOINTMENTS + '_ERROR']: (state, { payload }) => {
		return {
			...state,
			Appointments: Immutable.fromJS(payload),
			fetchingAppointments: false
	    };
	},
	[Actions.Appointment.list.ADD_APPOINTMENT]: (state, { payload }) => {
	    return {
	    	...state,
	    	addingAppointment: true,
    	}
	},
	[Actions.Appointment.list.ADD_APPOINTMENT + '_SUCCESS']: (state, { payload }) => {
		return {
			...state,
			Appointments: state.Appointments.unshift(payload),
			addingAppointment: false
	    }
	},
	[Actions.Appointment.list.ADD_APPOINTMENT + '_ERROR']: (state, { payload }) => {
		return {
			...state,
			addAppointmentError: true
			addingAppointment: false
		}
	}
};

export const initialState = {
	Appointments: new List(),
	fetchingAppointments: false,
	addingAppointment: false,
	addAppointmentError: false
};

export default handleActions(reducers, initialState);