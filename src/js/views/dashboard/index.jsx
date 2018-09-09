import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Actions from 'actions';
import CandidateListSelector from 'selectors/candidateListSelector';
import AssessmentListSelector from 'selectors/assessmentListSelector';
import { actions as CandidateActions } from 'reducers/candidateListReducer';
import { actions as AssessmentActions } from 'reducers/assessmentListReducer';
import DashboardView from 'components/dashboard/dashboardView';

const mapStateToProps = state => ({
  ...CandidateListSelector(state),
  ...AssessmentListSelector(state)
});

const mapDispatchToProps = {
  ...CandidateActions,
  ...AssessmentActions
};

@connect(mapStateToProps, mapDispatchToProps)
class DashboardViewWrapper extends Component {
    render() {
        return <DashboardView className='dashboard-container' {...this.props} 
            assessments={Immutable.fromJS([
                {
                    id: 'abcAssessment',
                    label: 'ABC Assessment',
                    description: 'This is to assess you.',
                    repoUrl: 'github.com',
                },
                {
                        id: 'abcAssessment2',
                        label: 'ABC Assessment 2',
                        description: 'This is to assess you.',
                        repoUrl: 'github.com',
                }
            ])}
            candidates={Immutable.fromJS([
                {
                    firstName: "Karth",
                    lastName: "ICKKKKK",
                    email: "abc@pooppp.com"
                },
                {
                    firstName: "Nguyen",
                    lastName: "Jin",
                    email: "abc@poop.com"
                }
            ])}
        />
    }
}

export default DashboardViewWrapper;
