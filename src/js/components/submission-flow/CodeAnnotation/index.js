import React, { Component } from 'react';
import CodeBlock from './CodeBlock'
import LoadingSpinner from 'commonComponents/LoadingSpinner'

import './CodeAnnotation.css'

class CodeAnnotation extends Component {

  shouldComponentUpdate() {
    // TODO: only update when necessary. Currently this updates every time the clock ticks... really dumb.
    return true;
  }

  render() {
    let props = this.props;

    // if fetching annotations in progress, show the loading spinner:
    if (props.isFetchingAnnotationsForCodeSnippet) {
      return (
        <div className="code-annotation-container">
          <LoadingSpinner />
        </div>
      )
    }

    let codeSnippetString = props.codeSnippetString ? props.codeSnippetString : ""

    return (
      <div className="code-annotation-container">
        <p style={{marginBottom: 5}}><b>{this.props.codeSnippetTitle}</b></p>
        <CodeBlock 
          annotationMap={props.annotationMap}
          newNoteMap={props.newNoteMap}
          codeSnippetString={codeSnippetString} 
          lastModifiedAnnotationid={props.lastModifiedAnnotationid}

          startAnnotation={props.startAnnotation}
          createAnnotation={props.createAnnotation}
          deleteAnnotation={props.deleteAnnotation}
          updateAnnotationNoteText={props.updateAnnotationNoteText}
          cancelAnnotation={props.cancelAnnotation}
        />
      </div>
    );
  }
}

export default CodeAnnotation;
