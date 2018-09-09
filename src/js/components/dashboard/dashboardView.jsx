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

        let candidates = this.props.candidates;
        if (candidates && this.state.filter && this.state.filter.trim()) {
            candidates = candidates.filter((candidate) => 
                _.includes(candidate.get('firstName'), this.state.filter) ||
                _.includes(candidate.get('lastName'), this.state.filter) ||
                _.includes(candidate.get('email'), this.state.filter)
            );
        }

        if (!candidates || candidates.isEmpty()) {
            return (
                <div className='no-candidate-splash'>
                    No Data
                </div>
            );
        }

        return (
            <div className='submission-container'>
                <form>
                    <InputField
                        id='filterCandidates'
                        type='text'
                        placeholder={'Filter Candidates'}
                        value={this.state.filter}
                        onChange={(e) => this.setState({filter: e.target.value})}
                    />
                </form>
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
                        {_.map(candidates.toJS(), this.renderRow)}
                    </tbody>
                </Table>
            </div>
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
        // TODO: Temporary. Rely on callback
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
