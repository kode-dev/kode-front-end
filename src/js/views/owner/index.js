import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as ownerActions } from 'ownerStore';
import { ownerSelector } from '../../redux/selectors/ownerSelector';

import OwnerFlow from '../../components/owner-flow';

const mapStateToProps = state => ({
  ...ownerSelector(state),
});

const mapDispatchToProps = {
  ...ownerActions,
};

@connect(mapStateToProps, mapDispatchToProps)
class OwnerView extends Component {
  render() {
    return <OwnerFlow {...this.props} />
  }
}

export default OwnerView;
