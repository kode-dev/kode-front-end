import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Actions from 'actions';
import AppointmentListSelector from 'selectors/appointmentListSelector';
import AssessmentListSelector from 'selectors/assessmentListSelector';
import { actions as AppointmentActions } from 'reducers/appointmentListReducer';
import { actions as AssessmentActions } from 'reducers/assessmentListReducer';
import DashboardView from 'components/dashboard/dashboardView';
import Navbar from 'commonComponents/navbar'

const mapStateToProps = state => ({
  ...AppointmentListSelector(state),
  ...AssessmentListSelector(state)
});

const mapDispatchToProps = {
  ...AppointmentActions,
  ...AssessmentActions
};

@connect(mapStateToProps, mapDispatchToProps)
class DashboardViewWrapper extends Component {
    render() {
        return (

            <div>
                <Navbar {...this.props} />
                <DashboardView className='dashboard-container' {...this.props} 
                />
            </div>
        )
    }
}

export default DashboardViewWrapper;
