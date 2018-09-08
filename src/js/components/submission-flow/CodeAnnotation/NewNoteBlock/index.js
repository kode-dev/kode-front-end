import React, { Component } from 'react';
import RichTextEditor from 'commonComponents/RichTextEditor'
import { Button } from 'react-bootstrap'
import '../NoteBlock/NoteBlock.css'

// props (for existing annotation):
// - annotation (not available if this is for a new component.)
// - updateAnnotationNoteText
// - deleteAnnotation

// props (for new note):
// - line (the line number --> which is necessary if isNew)
// - isNew
// - cancelAnnotation
// - createAnnotation

class NewNoteBlock extends Component {

	constructor(props) {
		super(props)
		this.state = {
			noteText: RichTextEditor.createEmptyValue(),
		}
		this.save = this.save.bind(this)
	}

	save() {
		this.props.createAnnotation(this.props.line, this.state.noteText.toString('html'))
	}

	render() {
		return (
		  	<div className="note-block card">
			  	<RichTextEditor
			  		value={this.state.noteText}
			  		onChange={(v) => {this.setState({noteText: v})}}
			  	/>
			  	<div className="note-block-panel"> 
					<Button onClick={() => this.props.cancelAnnotation(this.props.line)}>Cancel</Button>
					<Button bsStyle="primary" onClick={this.save}>Write Comment</Button>
				</div>
		  </div>
		);
	}
}

export default NewNoteBlock;
