import React, { Component } from 'react';
import './SubmitSubmission.css'

import { getTimeLeftString } from 'utility/util'
import { Button } from 'react-bootstrap'

// - timeLeft
// - submit()
// - setSubmitButtonClicked()
// - submitButtonClickedOnce
class SubmitSubmission extends Component {
  constructor(props) {
    super(props)
    this.onSubmitClick = this.onSubmitClick.bind(this)
  }

  onSubmitClick() {
    if (this.props.submitButtonClickedOnce) this.props.submit()
    else this.props.setSubmitButtonClicked()
  }

  render() {
    if (this.props.timeLeft <= 0) {
      return (
        <div className="submit-submission">
          <p>Unfortunately you don't have any time left. Please submit if you would like to share your response.</p>
          <Button
            className="submit-button"
            bsStyle="primary"
            onClick={this.onSubmitClick}
          >
            Submit
          </Button>
        </div>
      );
    }

    return (
      <div>
        <p style={{marginBottom: 5}}><b>Submit Submission</b></p>
        <div className="submit-submission">
          {
            (!this.props.submitButtonClickedOnce) ?
            <p>Please check your work before you submit. You still have {getTimeLeftString(this.props.timeLeft)}.</p>
            :
            <p>You won't be able to change your answers once you've submitted. If you are ready, click the following button to confirm your submission.</p>
          }
          <Button
            className="submit-button"
            bsStyle="primary"
            onClick={this.onSubmitClick}
            >
              {(!this.props.submitButtonClickedOnce) ? "Submit" : "Yes, I'm done. Submit!"}
          </Button>
        </div>
      </div>
    );
  }
}

export default SubmitSubmission;
