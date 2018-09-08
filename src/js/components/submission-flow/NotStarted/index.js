import React, { Component } from 'react';
import RichTextEditor from 'commonComponents/RichTextEditor';

import './NotStarted.css'

import { Button } from 'react-bootstrap'

import { getTimeLimitString } from 'utility/util'

import Instructions from 'components/submission-flow/Instructions'

// props:
// - assignmentTimeLimit
// - assignmentPreStartMessage
// - candidate
// - owner
// - startSubmission()
class NotStarted extends Component {
  render() {
    let owner = this.props.owner;
    let candidate = this.props.candidate;
    let timeLimitString = getTimeLimitString(this.props.assignmentTimeLimit)

    if (!this.props.candidate || !this.props.owner) return ''

    return (
      <div className="not-started">

        <RichTextEditor readOnly={true} value={RichTextEditor.createValueFromString(this.props.assignmentPreStartMessage, 'html')} />

        <Button bsStyle="primary" onClick={() => this.props.startSubmission()}>Start Code Review Assessment</Button>

      </div>
    );
  }
}

export default NotStarted;
