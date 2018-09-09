export const kodeMockData = {
	organization: {
		id: 'test-org',
		name: 'Salesforce-IT'
	},

	user: {
		organization: 'test-org'		
		firstName: 'John',
		lastName: 'Appleseed',
		email: 'john@poop.com',
	},

    candidate: {
      	organization: 'test-org'
        firstName: "Nguyen",
        lastName: "Jin",
        email: "abc@poop.com",
    },

	assessment: {
		id: 'abcAssessment',
		description: 'This is to assess you.',
		repo: 'https://github.com',
	}

	appointment: {
		organization: 'test-org'
		id: '234',
		candidate: "abc@poop.com",
		assessment: 'abcAssessment',
		createdBy: 'john@poop.com',
		start: "August 24th 2018",
		duration: 90,
		githubRepoUrl: "https://github.com",
		interviewChat: "https://github.com"
	},

  	report: {
  		id = '2343'
	    appointment: '123',
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
};

	

