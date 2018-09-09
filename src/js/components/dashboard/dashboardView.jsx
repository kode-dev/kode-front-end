import React, { Component } from 'react';

import { Table } from 'react-bootstrap';
import _ from 'lodash';
import NewCandidateModal from './newCandidateModal';
import LoadingSpinner from 'commonComponents/loadingSpinner';

class DashboardView extends Component {

    componentWillMount() {
        this.props.fetchCandidates();
    },

    renderRow(candidate) {
        return (
            <tr>
                <td>{`${candidate.lastName}, ${candidate.firstName}`}</td>
                <td>{candidate.email}</td>
                <td>{candidate.status}</td>
            </tr>
        );
    },

    renderTable() {
        if (!this.props.candidates || this.props.candidates.isEmpty()) {
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
                    {_.map(this.props.candidates.toJS(), renderRow(candidate))}
                </tbody>
            </Table>
        );
    },

    renderHeader() {
        return (
            <Button
                bsStyle='success'
                onClick={this.handleNew}
            >
                +New
            </Button>
        );
    },

    handleNew() {
        this.setState({
            newCandidateModal: true
        });
    },

    handleSubmit(candidate) {

        this.props.addCandidate(candidate);
        // TODO: Temporary
        this.setState({
            newCandidateModal: false
        });
    },

    renderModal() {
        return (
            <NewCandidateModal
                assessments={this.props.assessments}
                onSubmit={this.handleSubmit}
            >
                +New
            </NewCandidateModal>
        );
    },

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
                {this.state.newCandidateModal && this.renderModal()}
            </div>
        );
    }
}

export default DashboardView;
