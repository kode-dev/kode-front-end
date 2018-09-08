import React, { Component } from 'react';

import ActiveSubmissionContainer from './ActiveSubmissionContainer'
import InActiveSubmissionContainer from './InActiveSubmissionContainer'
import LoadingSpinner from 'commonComponents/LoadingSpinner'

import Navbar from 'commonComponents/Navbar'
import TimeLimitBar from './TimeLimitBar'

import './submission-flow.css'

const NUM_NON_CODE_ELEMENTS = 2

// props: all parent props.
class SubmissionContainer extends Component {
  constructor(props) {
    super(props)

    this.isSubmissionActive = this.isSubmissionActive.bind(this)
    this.setUrlMode = this.setUrlMode.bind(this)
    this.setUrlToInActiveState = this.setUrlToInActiveState.bind(this)
    this.goToPosition = this.goToPosition.bind(this)
    this.selectCodeSnippetIfNecessary = this.selectCodeSnippetIfNecessary.bind(this)
    this.wrapNavbar = this.wrapNavbar.bind(this)
  }

  componentWillMount() {
    let submissionId = this.props.match.params.submissionId
    let mode = this.props.match.params.mode
    this.props.setIdAndMode(submissionId, mode) // TODO: remove this func and JUST set the submissionId.
    this.props.checkIfUserLoggedInAndGetSubmission()
    this.setUrlMode(0) // default to the start of the assignment (this is fine for now!).
  }

  isSubmissionActive() {
    let props = this.props

    if (
      !props.general.isUserLoggedIn || 
      props.submission.isSubmitted || 
      !props.submission.isStarted ||
      (props.general.timeLeft <= 0) 
    ) {
      return false
    } else {
      return true
    }
  }

  goToPosition(x) {
    this.selectCodeSnippetIfNecessary(x)
    this.setUrlMode(x)
  }

  setUrlMode(mode) {
    console.log(this.props.history)
    if (this.props.history.location.pathname.includes('/demo/')) {
      this.props.history.replace('/demo/' + this.props.match.params.submissionId + '/' + mode)
    } else {
      this.props.history.replace('/submission/' + this.props.match.params.submissionId + '/' + mode)
    }
  }

  // TODO: marginTop values are explicitly set... put in constants to make more failproof.
  wrapNavbar(comp) {
    let props = this.props
    return (
      <div className="container submission-flow-container" style={{marginTop: (props.general.flashMessages.length*40) + 60}}>
        <Navbar
          candidateFullName={(props.candidate) ? props.candidate.firstName : ""}
          isStarted={props.submission.isStarted}
          flashMessages={props.general.flashMessages}
          timeLimitBar={
            <TimeLimitBar
              setTimeLeft={props.setTimeLeft}
              timeLeft={props.general.timeLeft}
              isStarted={props.submission.isStarted}
              isSubmitted={props.submission.isSubmitted}
            />
          }
          onSignOut={props.logoutCandidate}
        />
        <div className="submission-container">
          {comp}
        </div>
      </div>
    )
  }

  setUrlToInActiveState() {
    let props = this.props
    let mode = this.props.match.params.mode
    if ((!props.owner || !props.candidate || !props.assignment) && mode !== '.') {
      this.setUrlMode('.')
    } else if (
        !props.general.isUserLoggedIn && 
        !props.fetching && 
        mode !== 'not-logged-in'
      ) {
        //this.setUrlMode('not-logged-in')
    } else if (
        props.assignment._id && 
        props.general.isUserLoggedIn &&
        props.submission.isSubmitted && 
        mode !== 'submitted'
      ) {
        this.setUrlMode('submitted');
    } else if (
        props.assignment._id && 
        props.general.isUserLoggedIn &&
        !props.submission.isStarted && 
        mode !== 'not-started'
      ) {
        this.setUrlMode('not-started');
    } else if (
        props.assignment._id &&
        props.general.isUserLoggedIn &&
        props.general.timeLeft <= 0 && 
        mode !== 'no-time-left' && 
        props.submission.isStarted && 
        !props.submission.isSubmitted
      ) {
        this.setUrlMode('no-time-left')
    } else {
      // this means that the url mode matches the current state. Great!
    }
  }

  selectCodeSnippetIfNecessary(modeNumber) {
    let numElements = this.props.assignment.codeSnippets.length + NUM_NON_CODE_ELEMENTS
    if (modeNumber > 0 && modeNumber < (numElements - 1)) {
      // then this is a codeSnippet associated modeNumber:
      let correctCodeSnippetId = this.props.assignment.codeSnippets[(modeNumber - 1)]
      // if this correct code snippet isn't set in store, then set it:
      if (correctCodeSnippetId !== this.props.general.selectedCodeSnippetId) {
        this.props.selectCodeSnippet(correctCodeSnippetId)
      } 
    }
  }

  render() {
    let props = this.props
    // if there's something fetching, render the loading animation:
    if (props.general.fetching) {
      return (
        <div className="container submission-flow-container">
          <div className="submission-outer-container">
            <LoadingSpinner />
          </div>
        </div>
      );
    }

    // if the submission hasn't loaded, don't show anything:
    if (!props.assignment) {
      return (<div>no assignment </div>)
    }

    if (this.isSubmissionActive()) {
      let modeNumber = Number(this.props.match.params.mode)
      if (isNaN(modeNumber)) {
        modeNumber = 0
        this.setUrlMode(modeNumber)
      }

      return this.wrapNavbar(
        <ActiveSubmissionContainer 
          goToPosition={this.goToPosition}
          numElements={(NUM_NON_CODE_ELEMENTS + props.assignment.codeSnippets.length)} 
          modeNumber={modeNumber} 
          { ...this.props } 
        />
      )
    }

    // this is an inactive submission:
    // check the mode to see if it corresponds to the correct state (and if it does not, set it to the correct state):
    this.setUrlToInActiveState()

    return this.wrapNavbar(<InActiveSubmissionContainer { ...this.props }/>)
  }
}

export default SubmissionContainer;
