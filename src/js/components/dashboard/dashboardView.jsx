import React, { Component } from 'react';

import { Table, Button } from 'react-bootstrap';
import _ from 'lodash';
import NewCandidateModal from './newCandidateModal';
import LoadingSpinner from 'commonComponents/loadingSpinner';

class DashboardView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.fetchCandidates();
    }

    renderRow(candidate) {
        return (
            <tr>
                <td>{`${candidate.lastName}, ${candidate.firstName}`}</td>
                <td>{candidate.email}</td>
                <td>{candidate.status}</td>
            </tr>
        );
    }

    renderTable() {
        if (!this.props.candidates || this.props.candidates.isEmpty()) {
            return (
                <div className='no-candidate-splash'>
                    No Data
                </div>
            );
        }

        return (
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
                    {_.map(this.props.candidates.toJS(), this.renderRow)}
                </tbody>
            </Table>
        );
    }

    renderHeader() {
        return (
            <Button
                bsStyle='success'
                onClick={this.handleNew.bind(this)}
            >
                +New
            </Button>
        );
    }

    handleNew() {
        this.setState({
            newCandidateModalOpen: true
        });
    }

    handleSubmit(candidate) {

        this.props.addCandidate(candidate);
        // TODO: Temporary
        this.setState({
            newCandidateModalOpen: false
        });
    }

    renderModal() {
        return (
            <NewCandidateModal
                fetchAssessments={this.props.fetchAssessments}
                assessments={this.props.assessments}
                onSubmit={this.handleSubmit.bind(this)}
            >
                +New
            </NewCandidateModal>
        );
    }

    render() {
        if (this.props.fetchingCandidates) {
            return (
                <LoadingSpinner />
            );
        }

        return (
            <div className='submission-container'>
                {this.renderHeader()}
                {this.renderTable()}
                {this.state.newCandidateModalOpen && this.renderModal()}
            </div>
        );
    }
}

export default DashboardView;
