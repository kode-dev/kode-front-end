import React, { Component } from 'react';
import RichTextEditor from 'commonComponents/RichTextEditor'
import { Button } from 'react-bootstrap'

import './NoteBlock.css'

const READ_MODE = 'read_mode'
const EDIT_MODE = 'edit_mode'

// props (for existing annotation):
// - annotation (not available if this is for a new component.)
// - updateAnnotationNoteText
// - deleteAnnotation
class NoteBlock extends Component {

	constructor(props) {
		super(props)

		// if this is for a new note: it should be in EDIT_MODE, and the value initialized to an empty buffer.
		let noteText = (props.isNew) ? RichTextEditor.createEmptyValue() : RichTextEditor.createValueFromString(props.annotation.noteText, 'html')
		this.state = {
			mode: READ_MODE,
			noteText: noteText,
			editedNoteText: noteText,
			hover: false
		}

		this.toggleMode = this.toggleMode.bind(this)
		this.cancelEdit = this.cancelEdit.bind(this)
		this.saveAnnotation = this.saveAnnotation.bind(this)
	}

	// when the noteText for this annotation is modified here, then reset the state.
	componentWillReceiveProps(nextProps) { 
		if (nextProps.annotation.noteText !== this.props.annotation.noteText) {
			let note = RichTextEditor.createValueFromString(nextProps.annotation.noteText, 'html')
			this.setState({
				mode: READ_MODE,
				noteText: note,
				editedNoteText: note
			})
		}
	}

	toggleMode() {
		if (this.state.mode === READ_MODE) return this.setState({mode: EDIT_MODE})
		this.setState({mode: READ_MODE})
	}

	cancelEdit() {
		// need to set the editedNoteText back to the original noteText --> since the changes will not be saved.
		this.setState({
			editedNoteText: this.state.noteText
		})
		this.toggleMode()
	}

	saveAnnotation() {
		this.props.updateAnnotationNoteText(this.props.annotation._id, this.state.editedNoteText.toString('html'))
		this.toggleMode()
	}

	render() {
		let bottomPanel = ''
		let topPanel = ''
		if (this.state.mode === READ_MODE) {
			if (this.state.hover) {
				bottomPanel = (
					<div className="note-block-panel"> 
						<Button bsStyle="link" style={{marginRight: 10}} onClick={this.toggleMode}>Edit</Button> 
						<Button bsStyle="link" style={{marginRight: 10, color: 'red'}} onClick={() => this.props.deleteAnnotation(this.props.annotation._id)}>Delete</Button>
					</div>
				)
			}
		} else {
			bottomPanel = (
				<div className="note-block-panel">
					<Button onClick={this.cancelEdit}>Cancel</Button>
					<Button bsStyle="primary" onClick={this.saveAnnotation}>Update Comment</Button>
				</div>
			)
		}

		return (
		  	<div className="note-block card" 
		  		onMouseEnter={() => this.setState({hover: true})}
		   		onMouseLeave={() => this.setState({hover: false})}
	   		>
			  	<RichTextEditor
			  		value={this.state.editedNoteText}
			  		onChange={(v) => {this.setState({editedNoteText: v})}}
			  		readOnly={this.state.mode === READ_MODE}
			  	/>
			  	{bottomPanel}
		  </div>
		);
	}
}

export default NoteBlock;
