import React, { Component } from 'react';
import RichTextEditor from 'commonComponents/RichTextEditor';
import CodeEditor from 'commonComponents/CodeEditor'
import FormControlInput from 'commonComponents/FormControlInput'

import './style.css'

import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { Button, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap'

import validations from './validations'

// all possible languages (TODO: stick this in a constants dir --> in case it's used in multiple places.)
const LANGUAGES = [
  'javascript',
  'python',
  'ruby',
  'java',
  'c',
  'c++'
]

// time limits --> corresponds to minutes. -1 ==> no time limit.
const TIME_LIMITS = [
  30,
  60,
  90,
  120,
]

const MAX_CODE_SNIPPETS = 3

function getTimeLimitString(timeLimit) {
  if (timeLimit < 0) return 'No time limit';
  return timeLimit + " minutes";
}

class CreateAssignmentForm extends Component {

  constructor(props, context) {
    super(props, context);

    this.updateCodeSnippet = this.updateCodeSnippet.bind(this)
    this.updateCodeSnippetTitle = this.updateCodeSnippetTitle.bind(this)
    this.createAndOpenDemo = this.createAndOpenDemo.bind(this)
    this.submit = this.submit.bind(this)
    this.createAssignmentObject = this.createAssignmentObject.bind(this)
    this.addCodeSnippetForm = this.addCodeSnippetForm.bind(this)

    this.getValidationErrors = this.getValidationErrors.bind(this)

    this.state = {
      title: '',
      instructions: RichTextEditor.createEmptyValue(),
      message: RichTextEditor.createEmptyValue(),
      postSubmit: RichTextEditor.createEmptyValue(),
      language: LANGUAGES[0],
      timeLimit: TIME_LIMITS[0],
      codeSnippets: [{
          title: '',
          snippet: '', 
      }]
    };
  }

  updateCodeSnippet(index, snippet) {
    let snippets = [...this.state.codeSnippets]
    snippets[index].snippet = snippet;
    this.setState({codeSnippets: snippets});
  }

  updateCodeSnippetTitle(index, title) {
    let snippets = [...this.state.codeSnippets]
    snippets[index].title = title;
    this.setState({codeSnippets: snippets});
  }

  createAssignmentObject() {
    let newAssignment = {
      title: this.state.title,
      preStartMessage: this.state.message.toString('html'),
      postSubmitMessage: this.state.postSubmit.toString('html'),
      timeLimit: (this.state.timeLimit*60),
      instructions: this.state.instructions.toString('html'),
    }

    // TODO: might want to change logic to allow for multiple languages across code snippets... wait for customers to ask.
    let codeSnippets = this.state.codeSnippets.slice()
    for (var i = 0; i < codeSnippets.length; i++) {
      codeSnippets[i].language = this.state.language
    }

    newAssignment.codeSnippets = codeSnippets
    return newAssignment
  }

  addCodeSnippetForm() {
    if (this.state.codeSnippets.length < MAX_CODE_SNIPPETS) {
      let newCodeSnippets = this.state.codeSnippets.concat({ title: '', snippet: ''})
      this.setState({ codeSnippets: newCodeSnippets })
    }
  }

  createAndOpenDemo() {
    this.props.createDemoAssignment(this.createAssignmentObject())
  }

  submit() {
    this.props.createAssignment(this.createAssignmentObject())    
  }

  getValidationErrors() {
    let errors = []
    for (var i = 0; i < this.state.codeSnippets.length; i++) {
      let snippet = this.state.codeSnippets[i]
      if (snippet.title.length > validations.titleLength) errors.push('Code snippet (' + i + ') title too long.')
      if (snippet.snippet.length > validations.codeSnippetLength) errors.push('Code snippet (' + i + ') too long.')
    }

    if (!(this.state.title && this.state.codeSnippets[0].snippet)) errors.push('Need at least a title and a code snippet to create an assignment.')

    if (this.state.message.getEditorState().getCurrentContent().getPlainText().length > validations.messageLength) errors.push('Pre start message too long.')
    if (this.state.instructions.getEditorState().getCurrentContent().getPlainText().length > validations.messageLength) errors.push('Instructions too long.')
    if (this.state.postSubmit.getEditorState().getCurrentContent().getPlainText().length > validations.messageLength) errors.push('Post submit message too long.')

    return errors
  }

  render() {

    let addCodeSnippetButton = (this.state.codeSnippets.length >= MAX_CODE_SNIPPETS) ? '' : (
      <Button 
        bsStyle="link"
        onClick={this.addCodeSnippetForm}>
          Add Code Snippet
      </Button>
    )

    let codeSnippetForms = this.state.codeSnippets.map((c, i) => {
      return (
        <div className="code-snippet-form-group">
          <FormGroup
            controlId={"code-snippet-form-" + i}
          >

            <div className="code-title-container">
              <ControlLabel>Code Snippet filename / title</ControlLabel>
              <FormControlInput
                type="text"
                value={c.title}
                maxLength={validations.titleLength}
                onChange={(e) => (this.updateCodeSnippetTitle(i, e.target.value))}
              />
            </div>

            <div className="code-input-container">
              <ControlLabel>{(i === 0) ? "Code snippet*" : "Code snippet"}</ControlLabel>
              <CodeEditor 
                value={c.snippet}
                mode={this.state.language}
                onChange={(v) => {this.updateCodeSnippet(i, v)}}
                maxLength={validations.codeSnippetLength}
              />
            </div>
          </FormGroup>
        </div>
      )
    })

    let languageMenuItems = LANGUAGES.map((lang, i) => {
      return (
        (this.state.language !== lang) ? <MenuItem onClick={() => {
            this.setState({language: lang})
          }
        } eventKey={i}>{lang}</MenuItem> : ''
      )
    })

    let timeLimits = TIME_LIMITS.map((timeLimit, i) => {
        if (this.state.timeLimit !== timeLimit) {
          return (<MenuItem onClick={() => this.setState({timeLimit: timeLimit})} eventKey={i}>{getTimeLimitString(timeLimit)}</MenuItem>)
        } 
    })

    // setting up the error messaging:
    let errors = this.getValidationErrors().map((error) => (
      <p className="error">({error})</p>
    ))
    let canSubmit = errors.length === 0

    return (
      <div>
        <h2 className="text-centered">Create New Assignment</h2>
        <div className="create-assignment-container">
          <form className="create-assignment-form">
            <FormGroup
              controlId="assignmentTitle"
            >
              <ControlLabel>Assignment Title*</ControlLabel>
              <FormControlInput
                type="text"
                maxLength={validations.titleLength}
                value={this.state.title}
                onChange={(e) => this.setState({title: e.target.value})}
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="timeLimit"
            >
              <ControlLabel style={{marginRight: 5}}>Assignment time limit</ControlLabel>
              <DropdownButton
                className="time-limit-dropdown"
                title={getTimeLimitString(this.state.timeLimit)}
                id={`dropdown-basic`}
              >
              {timeLimits}
              </DropdownButton>
            </FormGroup>

            <FormGroup
              controlId="message"
            >
              <ControlLabel>Message to Candidate</ControlLabel>
              <p className="label-caption">Candidates see this message before they start the assignment.</p>
              <RichTextEditor 
                value={this.state.message} 
                onChange={(v) => {this.setState({message: v})}}
                maxLength={validations.messageLength}
              />
            </FormGroup>

            <FormGroup
              controlId="instructions"
            >
              <ControlLabel>Instructions</ControlLabel>
              <p className="label-caption">Candidates see this message as soon as they start their assignment.</p>
              <RichTextEditor 
                value={this.state.instructions} 
                onChange={(v) => {this.setState({instructions: v})}}
                maxLength={validations.messageLength}
              />
            </FormGroup>


            <FormGroup
              controlId="postSubmit"
            >
              <ControlLabel>Post Submit Message</ControlLabel>
              <p className="label-caption">Candidates see this message after they submit their assignment. You could explain how you would have reviewed the code, and/or what the next steps are.</p>
              <RichTextEditor 
                value={this.state.postSubmit} 
                onChange={(v) => this.setState({postSubmit: v})}
                maxLength={validations.messageLength}
              />
            </FormGroup>

            <div className="code-form-section">
              <h3><b>Code</b></h3>
              <ControlLabel style={{marginRight: 5}}>Language</ControlLabel>

                <DropdownButton
                  title={this.state.language}
                  id={`dropdown-basic`}
                >
                  {languageMenuItems}
                </DropdownButton>
              <p className="label-caption">For syntax-highlighting the code you present to candidates - to review.</p>

              {codeSnippetForms}
              {addCodeSnippetButton}
            </div>

            <ButtonToolbar className="button-toolbar">
              <Button disabled={!canSubmit} onClick={this.createAndOpenDemo}>Demo - open in new tab</Button>
              <Button disabled={!canSubmit} bsStyle="primary" onClick={this.submit}>Submit</Button>
            </ButtonToolbar>
            {errors}

          </form>

        </div>
      </div>
    );
  }
}

export default CreateAssignmentForm;
 