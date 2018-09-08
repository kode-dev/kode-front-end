import React, { Component } from 'react';

import './style.css'
// props:
// - currentPosition
// - goToPosition
// - numElements
class AssignmentTopBar extends Component {
  render() {
    let props = this.props

    const onClickGenerator = (x) => {
      return () => props.goToPosition(x);
    }

    // create the buttons for each code snippet:
    var codeTabs = []
    for (var i = 1; i < props.numElements - 1; i++) {
      codeTabs.push(
        <button
          className={(props.currentPosition === i ? "btn-selected" : "btn-default")}
          onClick={onClickGenerator(i)}
          type="button"
          key={i}
        >
          Code - {i}
        </button>
      )
    }

    let x = props.currentPosition;
    return (
      <div className="assignment-top-bar">
        <div className="progress-bar-container">
          <button key={0} onClick={onClickGenerator(0)} type="button" className={(x === 0 ? "btn-selected" : "btn-default")}>Instructions</button>

          {codeTabs}

          <button key={props.numElements - 1} onClick={onClickGenerator(props.numElements - 1)} type="button" className={(x === (props.numElements - 1) ? "btn-selected" : "btn-default")}>Submit</button>
        </div>
      </div>
    )
  }
}

export default AssignmentTopBar;
