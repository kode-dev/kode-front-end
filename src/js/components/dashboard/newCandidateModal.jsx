import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';
import _ from 'lodash';

class NewCandidateModal extends Component {

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Add Candidate</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button>Close</Button>
                        <Button bsStyle="primary">Add Candidate</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default NewCandidateModal;
