import React, { Component } from 'react';

import { Button } from 'react-bootstrap'

// props:
// - incPosition()
// - decPosition()
// - position

// TODO: For some reason, global style is not setting outline: 'none' for these buttons. 
// Figure out why and make styling consistent for all buttons.
class ForwardBackwardNavigation extends Component {
  render() {
    let position = this.props.position;
    let isForwardValid = (position < (this.props.numElements - 1))
    let isBackValid = (position > 0)
    return (
      <div className="forward-backward-navigation" style={{float: 'left'}}>
          {(isBackValid) ?
            (<Button
              style={{outline: 'none'}}
              onClick={this.props.decPosition}
            >
              Back
            </Button>) : null
          }
          {(isForwardValid) ?
            (<Button
              style={{outline: 'none'}}
              onClick={this.props.incPosition}
            >
              Next
            </Button>) : null
          }
      </div>
    );
  }
}

export default ForwardBackwardNavigation;
