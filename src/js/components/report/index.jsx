import React, { Component } from 'react';
import './style.css'

import { Row, Col } from 'react-bootstrap'

import ScoreLine from './ScoreLine'

import Navbar from 'commonComponents/navbar'

class Report extends Component {
  render() {
    let report = {
        candidate: {
            firstName: "Nguyen",
            lastName: "Jin",
            email: "abc@poop.com"
        },
        appointment: {
          start: "August 24th 2018",
          duration: 90,
          githubRepoUrl: "https://github.com",
          interviewChat: "https://github.com"
        },
        communication: [
            {
                name: 'Clarity',
                score: 3,
                description: "Very clear in the way they communicated."
            },
            {
                name: 'Question Quality',
                score: 5,
                description: "Was able to ask all the right questions to be able to build the feature in the right way."
            }
        ],
        technical: [
            {
                name: 'Functionality',
                score: 3,
                description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
            },
            {
                name: 'Architecture',
                score: 5,
                description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
            },
            {
                name: 'Code Quality',
                score: 2,
                description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
            }
        ]
    }

    let communicationScores = report.communication.map((obj) => 
        (
            <ScoreLine
              name={obj.name}
              score={obj.score}
              description={obj.description}
            />
        )
    )

   let technicalScores = report.technical.map((obj) => 
        (
            <ScoreLine
              name={obj.name}
              score={obj.score}
              description={obj.description}
            />
        )
    )

    return (
      <div>
        <Navbar />
        <div className="report">
            <h2>Assessment Report</h2>
            <div className="card">
                <Row> 
                    <Col className="feat-col" xs={12} md={6}>
                        <p><b>Candidate</b></p>
                        <p>{report.candidate.firstName + ' ' + report.candidate.lastName}</p>
                    </Col>
                    <Col className="feat-col" xs={12} md={6}>
                        <p>Screened on:</p>
                        <p>{report.appointment.start}</p>
                    </Col>
                </Row>
            </div>
            <h3>Communication</h3>
            <div className="card">
                {communicationScores}
            </div>
            <h3>Technical</h3>
            <div className="card">
                {technicalScores}
            </div>
            <h3>References</h3>
            <div className="card">
                <p><a href="https://github.com">Candidate submission repository</a></p>
                <p><a href="https://github.com">Interview chat log</a></p>
            </div>
        </div>
      </div>
    );
  }
}

export default Report;
