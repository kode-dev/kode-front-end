import React, { Component } from 'react';
import 'style/Prism.css'
import './CodeBlock.css'
import Code from 'react-code-prettify';
import Prism from 'prismjs'
import Rangy from 'rangy'
import ReactDOM from 'react-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import CodeEditor from 'commonComponents/CodeEditor'

import NoteBlock from '../NoteBlock'
import NewNoteBlock from '../NewNoteBlock'

import { constants } from 'submissionStore'

// 
class CodeBlock extends Component {

  shouldComponentUpdate(nextProps) {
    if (Object.keys(nextProps.annotationMap).length !== Object.keys(this.props.annotationMap).length) return true
    if (Object.keys(nextProps.newNoteMap).length !== Object.keys(this.props.newNoteMap).length) return true
    if (nextProps.codeSnippetString !== this.props.codeSnippetString) return true
    let id = this.props.lastModifiedAnnotationId
    if (id && nextProps.annotationMap[id].snippet !== this.props.annotationMap[id].snippet) return true
    return false
  }

  render() {
    if (!this.props.codeSnippetString) return (<div className="code-container"></div>)

    let nonNewLineReplacedHtml = Prism.highlight(this.props.codeSnippetString, Prism.languages.javascript)
    // // properly create a newline, since Prism doesn't retain newline formatting correctly:
    let codeHtml = '<div class="xnote_line">' + nonNewLineReplacedHtml.replace(/(?:\r\n|\r|\n)/g, '</div><div class="xnote_line">')
    let reactDivs = ReactHtmlParser(codeHtml, {
                      transform: (node, i) => {
                        let lineDiv = convertNodeToElement(node)

                        // if this line has a note, stick the line and note into the same div:
                        if (i in this.props.annotationMap) {
                          return (
                            <div className="line-and-note">
                              {React.cloneElement(lineDiv, {className: lineDiv.props.className + '-has-note'})}
                              <NoteBlock annotation={this.props.annotationMap[(i)]} updateAnnotationNoteText={this.props.updateAnnotationNoteText} deleteAnnotation={this.props.deleteAnnotation} />
                            </div>
                          )
                        }

                        // if there is a newNote that was initialized for this line: 
                        if (i in this.props.newNoteMap) {
                          return (
                            <div className="line-and-new-note">
                              {React.cloneElement(lineDiv, {className: lineDiv.props.className + '-new-note'})}
                              <NewNoteBlock isNew={true} cancelAnnotation={this.props.cancelAnnotation} createAnnotation={this.props.createAnnotation} line={i} />
                            </div>
                          )
                        }

                        // add the onClick, that will add a NoteBlock under this line - to capture candidate notes.
                        if (lineDiv) {
                          return React.cloneElement(lineDiv, 
                            {
                              onClick: () => this.props.startAnnotation(i)
                            }
                          )
                        }
                        return ''
                      }
                    })

    return (
      <div className="code-container">
        <pre>
          <code className="language-javascript">
            <div>
              {reactDivs}
            </div>
          </code>
        </pre>
      </div>

    );
  }
}

export default CodeBlock;
