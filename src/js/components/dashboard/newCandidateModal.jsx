import React, { Component } from 'react';

import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import InputField from 'commonComponents/inputField';
import LoadingSpinner from 'commonComponents/loadingSpinner';
import _ from 'lodash';

class NewCandidateModal extends Component {

    componentWillMount() {
        this.props.fetchAssessments();
    },

    handleSubmit() {
        this.props.onSubmit({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            assessment: this.state.selectedAssessment
        });
    },

    renderAssessment(assessment) {
        return (
            <ListGroupItem 
                header={assessment.label}
                href='#'
                onClick={() => this.setState({ selectedAssessment: assessment.id })}
                active={assessment.id === this.state.selectedAssessment}
            >
                {assessment.description}
            </ListGroupItem>
        );
    },

    renderAssessmentSelector() {
        if (this.props.loadingAssessments) {
            return (
                <LoadingSpinner />
            );
        }

        return (
            <ListGroup>
                {_.map(this.props.assessments.toJS(), this.renderAssessment)}
            </ListGroup>
        );
    },

    disableSubmission() {
        return !(this.state.firstName && this.state.lastName && this.state.email && this.state.selectedAssessment);
    }

    render() {
        return (
            <div className='static-modal'>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Add Candidate</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <InputField
                                id='inputFirstName'
                                label='First Name'
                                type='text'
                                placeholder={'Enter candidate\'s first name'}
                                value={this.state.firstName}
                                onChange{(e) => this.setState({firstName: e.target.value})}
                            />
                            <InputField
                                id='inputLastName'
                                label='Last Name'
                                type='text'
                                placeholder={'Enter candidate\'s last name'}
                                value={this.state.lastName}
                                onChange{(e) => this.setState({lastName: e.target.value})}
                            />
                            <InputField
                                id='inputEmail'
                                label='Email Address'
                                type='text'
                                placeholder={'Enter candidate\'s email address'}
                                value={this.state.email}
                                onChange{(e) => this.setState({email: e.target.value})}
                            />
                            {this.renderAssessmentSelector()}
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button>
                            Close
                        </Button>
                        <Button 
                            bsStyle='primary'
                            onClick={this.handleSubmit}
                            disabled={this.disableSubmission()}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default NewCandidateModal;
