import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as submissionActions } from 'submissionStore';
import { submissionSelector } from '../../redux/selectors/submissionSelector';

import SubmissionFlow from '../../components/submission-flow';

const mapStateToProps = state => ({
  ...submissionSelector(state),
});

const mapDispatchToProps = {
  ...submissionActions,
};

@connect(mapStateToProps, mapDispatchToProps)
class SubmissionView extends Component {
  render() {
    return <SubmissionFlow {...this.props} />
  }
}

export default SubmissionView;
