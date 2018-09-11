import React, { Component } from 'react';

import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import InputField from 'commonComponents/inputField';
import LoadingSpinner from 'commonComponents/loadingSpinner';
import _ from 'lodash';

class NewCandidateModal extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.fetchAssessments();
    }

    handleSubmit() {
        this.props.addAppointment({
            candidate: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            },
            assessmentId: this.state.selectedAssessment
        });
    }

    renderAssessment(assessment) {
        return (
            <ListGroupItem 
                header={assessment.label}
                href='#'
                onClick={() => this.setState({ selectedAssessment: assessment.key })}
                active={assessment.key === this.state.selectedAssessment}
            >
                {assessment.description}
            </ListGroupItem>
        );
    }

    renderButtons() {
        if (this.props.addAppointmentSuccess) {
            return (
                <Button onClick={() => this.props.setNewAppointmentModalOpen(false)}>
                    Done
                </Button>
            )
        }

        return (
            <div>
                <Button onClick={() => this.props.setNewAppointmentModalOpen(false)}>
                    Close
                </Button>
                <Button 
                    bsStyle='primary'
                    onClick={this.handleSubmit.bind(this)}
                    disabled={this.disableSubmission()}
                >
                    Submit
                </Button>
            </div>
        );
    }

    renderForm() {
        if (this.props.addAppointmentSuccess) {
            return (
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convallis placerat metus eu pretium. Nullam ut ex sapien. Etiam venenatis iaculis fermentum. Donec rutrum lacinia velit, nec efficitur leo elementum et. Ut facilisis non arcu sit amet iaculis. Cras id ipsum neque. 
                </div>
            )
        }

        return (
            <form>
                <InputField
                    id='inputFirstName'
                    label='First Name'
                    type='text'
                    placeholder={'Enter candidate\'s first name'}
                    value={this.state.firstName}
                    onChange={(e) => this.setState({firstName: e.target.value})}
                />
                <InputField
                    id='inputLastName'
                    label='Last Name'
                    type='text'
                    placeholder={'Enter candidate\'s last name'}
                    value={this.state.lastName}
                    onChange={(e) => this.setState({lastName: e.target.value})}
                />
                <InputField
                    id='inputEmail'
                    label='Email Address'
                    type='text'
                    placeholder={'Enter candidate\'s email address'}
                    value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})}
                />
                {this.renderAssessmentSelector()}
            </form>
        )
    }

    renderAssessmentSelector() {
        if (this.props.loadingAssessments) {
            return (
                <LoadingSpinner />
            );
        }
        return (
            <ListGroup>
                {_.map(this.props.assessments.toJS(), this.renderAssessment.bind(this))}
            </ListGroup>
        );
    }

    disableSubmission() {
        return !(this.state.firstName && this.state.lastName && this.state.email && this.state.selectedAssessment);
    }

    render() {
        if (this.props.addingAppointment) return (<LoadingSpinner />)
        return (
            <div className='static-modal'>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Add Candidate</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.addAppointmentError ? (<p className='error'>There was an error creating an appointment. Please try again.</p>) : ''}
                        {this.renderForm()}
                    </Modal.Body>

                    <Modal.Footer>
                        {this.renderButtons()}
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default NewCandidateModal;
