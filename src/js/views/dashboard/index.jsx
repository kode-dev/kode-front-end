import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from '../../redux/actions';
import CandidateListSelector from '../../redux/selectors/candidateListSelector';
import DashboardView from '../../components/dashboard/dashboardView';

const mapStateToProps = state => ({
  ...CandidateListSelector(state),
});

const mapDispatchToProps = {
  ...Actions.candidate.list,
};

@connect(mapStateToProps, mapDispatchToProps)
class DashboardViewWrapper extends Component {
  render() {
    return <DashboardView className='dashboard-container' {...this.props} />
  }
}

export default DashboardViewWrapper;
