import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript'
import 'brace/mode/python'
import 'brace/mode/ruby'
import 'brace/mode/java'
import 'brace/mode/c_cpp'
import 'brace/theme/github'

import './style.css'

// NOTE: had to put a {width: 100%} style in the AceEditor - otherwise it would be set to 500px.
class CodeEditor extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    // to handle the c/c++ mode:
    let mode = (this.props.mode === 'c' ||this.props.mode === 'cpp' || this.props.mode === 'c++') ? 'c_cpp' : this.props.mode
    
    let errorMessage = ''
    let containerClassName = "code-snippet-editor"
    let valueLength = this.props.value.length
    // if the value is longer than maxLength, then show the error:
    if (this.props.maxLength && (valueLength > this.props.maxLength)) {
      errorMessage = <p className="error">-{(valueLength - this.props.maxLength)} characters</p>
      containerClassName += " error-container"
    }

    return (
      <div>
        <div className={containerClassName}>
          <AceEditor
            style={{width: '100%'}}
            mode={mode}
            theme="github"
            onChange={this.props.onChange}
            name="3"
            editorProps={{$blockScrolling: true}}
            minLines={5}
            maxLines={50}
            readOnly={this.props.readOnly ? true : false}
            value={this.props.value ? this.props.value : ''}

            focus={false}
            highlightActiveLine={false}
          />
        </div>
        {errorMessage}
      </div>
    );
  }
}

export default CodeEditor;