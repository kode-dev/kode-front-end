import React, { Component } from 'react';

import { Table } from 'react-bootstrap';
import _ from 'lodash';
import NewCandidateModal from './newCandidateModal'

class DashboardView extends Component {

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
        if (!this.props.candidates || (this.props.candidates.length == 0)) {
            return (
                <div>
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
                    {_.map(this.props.candidates, renderRow(candidate))}
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

    render() {
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
