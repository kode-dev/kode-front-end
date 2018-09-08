import './style.css'

import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

import { FormControl } from 'react-bootstrap'

import './style.css'

// props:

// onPasteTooLong
// value
// maxLength
// readOnly
class FormControlInput extends Component {
  constructor(props) {
    super(props)
    this.getValueLength = this.getValueLength.bind(this)
  }

  getValueLength() {
    return this.props.value.length
  }

  render () {
    let errorMessage = ''
    let containerClassName = "form-control-input-container"
    let valueLength = this.getValueLength()
    // if the value is longer than maxLength, then show the error:
    if (this.props.maxLength && (valueLength > this.props.maxLength)) {
      errorMessage = <p className="error">-{(valueLength - this.props.maxLength)} characters</p>
      containerClassName += " error-container"
    }

    return (
      <div>
        <div className={containerClassName}>
			<FormControl
				type="text"
				value={this.props.value}
				onChange={this.props.onChange}
			/>
        </div>
        {errorMessage}
      </div>
    );
  }
}

export default FormControlInput;