const actions = {
	Appointment: {
		list: {
			FETCH_APPOINTMENTS: 'GET_APPOINTMENTS',
			ADD_APPOINTMENT: 'ADD_APPOINTMENT',
			SET_MODAL_VISIBILITY: 'SET_MODAL_VISIBILITY'
		},
		detail: {}
	},
	assessment: {
		list: {
			FETCH_ASSESSMENTS: 'GET_ASSESSMENTS'
		},
		detail: {}
	},
	dashboard: {},
	report: {}
}
export default actions;