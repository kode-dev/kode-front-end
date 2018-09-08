import React, { Component } from 'react';
import './FlashMessages.css'

// props:
// - flashMessages[]
class FlashMessages extends Component {
  render() {

    let messages = this.props.flashMessages.map((fm) => {
      let className = "flash-message" + ( (fm.color) ? (" " + fm.color) : "" );
      return (
        <p className={className}>
          {fm.message}
        </p>
      )
    })
    return (
      <div className="flash-messages">
        {messages}
      </div>
    );
  }
}

export default FlashMessages;
