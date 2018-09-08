import React, { Component } from 'react';
import 'style/Prism.css'
import Prism from 'prismjs'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import RichTextEditor from 'commonComponents/RichTextEditor'

import './style.css'

// codeSnippetId
// submissionId
// getSnippetInfoAndAnnotation()
class ViewCodeReview extends Component {

  componentDidMount() {
    this.props.getSnippetInfoAndAnnotations(this.props.submissionId, this.props.snippetId)
  }

  render() {
    if (!this.props.infoAndAnnotationMap) return (<div className="code-container"></div>)

    // we have the snippet string and annotations:
    let codeSnippetString = this.props.infoAndAnnotationMap.snippet
    let codeSnippetTitle = this.props.infoAndAnnotationMap.title
    let annotationMap = this.props.infoAndAnnotationMap.annotationMap

    let nonNewLineReplacedHtml = Prism.highlight(codeSnippetString, Prism.languages.javascript)
    // // properly create a newline, since Prism doesn't retain newline formatting correctly:
    let codeHtml = '<div class="xnote_line_no_hover_higlight">' + nonNewLineReplacedHtml.replace(/(?:\r\n|\r|\n)/g, '</div><div class="xnote_line_no_hover_higlight">')
    let reactDivs = ReactHtmlParser(codeHtml, {
                      transform: (node, i) => {
                        let lineDiv = convertNodeToElement(node)

                        // if this line has a note, stick the line and note into the same div:
                        if (i in annotationMap) {
                          return (
                            <div key={i} className="line-and-note">
                              {React.cloneElement(lineDiv, {className: lineDiv.props.className + '-has-note'})}
                              <div className="view-note card">
                                <div className="candidate-name">{this.props.candidateFullName}</div>
                                <RichTextEditor style={{padding: 0}} readOnly={true} value={RichTextEditor.createValueFromString(annotationMap[i].noteText, 'html')} />
                              </div>
                            </div>
                          )
                        }

                        // if no note exists: return the line as it is.
                        return lineDiv
                      }
                    })

    return (
      <div className="code-container">
        <p style={{marginBottom: 8}}>{this.props.candidateFullName + "'s review of "}<b>{codeSnippetTitle}</b>:</p>
        <pre>
          <code className="language-javascript">
            <div>
              {reactDivs}
            </div>
          </code>
        </pre>
      </div>

    )
  }
}

export default ViewCodeReview;
