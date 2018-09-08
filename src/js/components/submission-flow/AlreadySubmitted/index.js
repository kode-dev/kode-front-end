import React, { Component } from 'react';
import RichTextEditor from 'commonComponents/RichTextEditor';
//import './css';

import { getTimeStringFromUTCSeconds } from 'utility/util'

// props:
// - candidate
// - submitTimestamp
// - postSubmitMessage
class AlreadySubmitted extends Component {
  render() {
    return (
      <div className="already-submitted">
        <h3>Submitted</h3>
        <p>You've submitted your response on <b>{getTimeStringFromUTCSeconds(this.props.submitTimestamp)}</b></p>
        <RichTextEditor readOnly={true} value={RichTextEditor.createValueFromString(this.props.postSubmitMessage, 'html')} />
      </div>
    );
  }
}

export default AlreadySubmitted;
