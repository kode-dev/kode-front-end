import { createAction, handleActions } from 'redux-actions';
import { createAsyncAction } from 'utility/util'
import DashboardApi from 'api/dashboardApi';
import Actions from '../actions';

import _ from 'lodash'
import Immutable, { Map, List } from 'immutable';

export const fetchAppointments = createAsyncAction(
	Actions.Appointment.list.FETCH_APPOINTMENTS,
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
	(newAppointment) => {
		return DashboardApi.addAppointment(newAppointment).then(
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

export const setNewAppointmentModalOpen = createAction(
	Actions.Appointment.list.SET_MODAL_VISIBILITY,
	(isVisible) => (isVisible)
);

export const actions = {
    fetchAppointments,
    setNewAppointmentModalOpen,
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
			appointments: Immutable.fromJS(payload),
			fetchingAppointments: false
	    };
	},
	[Actions.Appointment.list.FETCH_APPOINTMENTS + '_ERROR']: (state, { payload }) => {
		return {
			...state,
			appointments: Immutable.fromJS(payload),
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
			appointments: state.appointments.unshift(payload),
			addAppointmentError: false,
			addAppointmentSuccess: true,
			addingAppointment: false,
	    }
	},
	[Actions.Appointment.list.ADD_APPOINTMENT + '_ERROR']: (state, { payload }) => {
		return {
			...state,
			addAppointmentError: true,
			addAppointmentSuccess: false,
			addingAppointment: false
		}
	},
	[Actions.Appointment.list.SET_MODAL_VISIBILITY]: (state, { payload }) => {
		// reset all modal related state:
		return {
			...state,
			isModalVisible: payload,
			addAppointmentError: false,
			addAppointmentSuccess: false,
			addingAppointment: false
		}
	}
};

export const initialState = {
	appointments: new List(),
	fetchingAppointments: false,

	addingAppointment: false,
	addAppointmentError: false,
	isModalVisible: false,
	addAppointmentSuccess: false
};

export default handleActions(reducers, initialState);