import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

import './style.css'

// props:

// onPasteTooLong
// value
// maxLength
// readOnly
class Editor extends Component {
  constructor(props) {
    super(props)
    this.getValueLength = this.getValueLength.bind(this)
    this.state = {}
  }

  static createValueFromString(str, mode) {
    return RichTextEditor.createValueFromString(str, mode)
  }

  static createEmptyValue() {
    return RichTextEditor.createEmptyValue()
  }

  getValueLength() {
    return this.props.value.getEditorState().getCurrentContent().getPlainText().length
  }

  render () {
    // The toolbarConfig object allows you to specify custom buttons, reorder buttons and to add custom css classes.
    // Supported inline styles: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Inline-Styles.md
    // Supported block types: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Custom-Block-Render.md#draft-default-block-render-map
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS','BLOCK_TYPE_DROPDOWN'],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
      ],
      BLOCK_TYPE_DROPDOWN: [
        {label: 'Normal', style: 'unstyled'},
        {label: 'Heading Large', style: 'header-one'},
        {label: 'Heading Medium', style: 'header-two'},
        {label: 'Heading Small', style: 'header-three'}
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'}
      ]
    }

    let errorMessage = ''
    let containerClassName = "rich-text-editor-container"
    let valueLength = this.getValueLength()
    if (this.props.maxLength && (valueLength > this.props.maxLength)) {
      errorMessage = <p className="error">-{(valueLength - this.props.maxLength)} characters</p>
      containerClassName += " error-container"
    }

    if (this.props.readOnly) containerClassName += " container-border-left"

    return (
      <div>
        <div className={containerClassName}>
          <RichTextEditor
            style={this.props.style}
            className="rich-text-editor secondary-font-color"
            toolbarConfig={toolbarConfig}
            value={this.props.value}
            onChange={this.props.onChange}
            readOnly={this.props.readOnly ? this.props.readOnly : false}
          />
        </div>
        {errorMessage}
      </div>
    );
  }
}

export default Editor;