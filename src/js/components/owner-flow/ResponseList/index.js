import React, { Component } from 'react';
import ResponseListItem from 'components/owner-flow/ResponseListItem'
import LoadingSpinner from 'commonComponents/LoadingSpinner'

// props: 
// - responses[]
// - fetching
// - history
class ResponseList extends Component {

	render() {
		if (this.props.fetching) return (<LoadingSpinner />)
		let responseList = this.props.responses.map((resp, i) => {

			if (!resp || !resp.candidate || !resp.assignment) return null;

			return (
				<ResponseListItem 
					key={i}
					assignmentTitle={resp.assignment.title}
					assignmentTimeLimit={resp.assignment.timeLimit}
					isStarted={resp.isStarted}
					isSubmitted={resp.isSubmitted}
					startTimestamp={resp.startTimestamp}
					submitTimestamp={resp.submitTimestamp}
					candidateFirstName={resp.candidate.firstName}
					candidateLastName={resp.candidate.lastName}
					onClick={() => {this.props.history.push("/assignment-submission/" + resp._id)}}
				/>
			)
		});
		
		return (
			<div className="assignment-list-container">
				{responseList}
			</div>
		);
	}
}

export default ResponseList;
