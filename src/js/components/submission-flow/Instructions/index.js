import React, { Component } from 'react';
import RichTextEditor from 'commonComponents/RichTextEditor';

import './Instructions.css';

// props:
// - candidate
// - assignmentInstructions
class Instructions extends Component {
  render() {
    return (
      <div className="instructions">
        <p><b>Instructions</b></p>
        <RichTextEditor readOnly={true} value={RichTextEditor.createValueFromString(this.props.assignmentInstructions, 'html')} />
      </div>
    );
  }
}

export default Instructions;
