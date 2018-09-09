export const mockData = {
    organization: {
        id: 123,
        label: 'poop.com'
    },
    user: {
        firstName: 'John',
        lastName: 'Appleseed',
        email: 'john@poop.com',
        organizationId: 123
    },
    candidate: {
        firstName: 'Nguyen',
        lastName: 'Jin',
        email: 'abc@poop.com',
        organizationId: 123
    },
    assessment: {
        id: 'abcAssessment',
        label: 'ABC Assessment',
        description: 'This is to assess you.',
        repoUrl: 'https://github.com'
    }
    appointment: {
        id: '234',
        candidate: 'abc@poop.com',
        assessment: 'abcAssessment',
        createdBy: 'john@poop.com',
        start: 'August 24th 2018',
        duration: 90,
        repoInstanceUrl: 'https://github.com',
        chatUrl: 'https://github.com',
        organizationId: 123
    },
    report: {
        id: '2343'
        appointment: '123',
        communication: [
            {
                name: 'Clarity',
                score: 3,
                description: 'Very clear in the way they communicated.'
            },
            {
                name: 'Question Quality',
                score: 5,
                description: 'Was able to ask all the right questions to be able to build the feature in the right way.'
            }
        ],
        technical: [
            {
                name: 'Functionality',
                score: 3,
                description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
            },
            {
                name: 'Architecture',
                score: 5,
                description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
            },
            {
                name: 'Code Quality',
                score: 2,
                description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
            }
        ]
    }
};