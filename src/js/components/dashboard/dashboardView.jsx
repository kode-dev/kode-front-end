import React, { Component } from 'react';

import { Table, Button } from 'react-bootstrap';
import _ from 'lodash';
import NewCandidateModal from './newCandidateModal';
import LoadingSpinner from 'commonComponents/loadingSpinner';
import InputField from 'commonComponents/inputField';

class DashboardView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.fetchAppointments();
    }

    renderRow(appointment) {
        return (
            <tr>
                <td>{`${appointment.candidate.lastName}, ${appointment.candidate.firstName}`}</td>
                <td>{appointment.candidate.email}</td>
                <td>{appointment.status}</td>
            </tr>
        );
    }

    renderTable() {
        let appointments = this.props.appointments;

        let contents;

        if (!appointments || appointments.isEmpty()) {
            contents = (
                <div className='no-appointment-splash'>
                    No Data
                </div>
            );
        } else {
            if (appointments && this.state.filter && this.state.filter.trim()) {
                appointments = appointments.filter((appointment) => 
                    _.includes(appointment.get('firstName'), this.state.filter) ||
                    _.includes(appointment.get('lastName'), this.state.filter) ||
                    _.includes(appointment.get('email'), this.state.filter)
                );
            }

            contents = (
                <Table 
                    responsive 
                    condensed
                >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(appointments.toJS(), this.renderRow)}
                    </tbody>
                </Table>
            );
        }
        return (
            <div className='submission-container'>
                <form>
                    <InputField
                        id='filterAppointments'
                        type='text'
                        placeholder={'Filter Screens'}
                        value={this.state.filter}
                        onChange={(e) => this.setState({filter: e.target.value})}
                    />
                </form>
                {contents}
            </div>
        );
    }

    renderHeader() {
        return (
            <Button
                bsStyle='success'
                onClick={() => this.props.setNewAppointmentModalOpen(true)}
            >
                +New
            </Button>
        );
    }

    renderModal() {
        return (
            <NewCandidateModal
                fetchAssessments={this.props.fetchAssessments}
                assessments={this.props.assessments}
                addAppointment={this.props.addAppointment}
                addingAppointment={this.props.addingAppointment}
                addAppointmentError={this.props.addAppointmentError}
                setNewAppointmentModalOpen={this.props.setNewAppointmentModalOpen}
            >
                +New
            </NewCandidateModal>
        );
    }

    render() {
        if (this.props.fetchingAppointments) {
            return (
                <LoadingSpinner />
            );
        }

        return (
            <div className='submission-container'>
                {this.renderHeader()}
                {this.renderTable()}
                {this.props.isModalVisible && this.renderModal()}
            </div>
        );
    }
}

export default DashboardView;
