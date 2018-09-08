import { fetchResponse, getBaseUrl } from 'utility/util'

class OwnerApi {
	static loginOwner(email, password) {
		const request = new Request(getBaseUrl() + 'user_login', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				email: email,
				password: password
			})
	    })
	    return fetchResponse(request)
	}

	static getCodeSnippetAndAnnotationsForCandidate(submissionId, codeSnippetId) {
		// /annotations_for_snippet/:responseId/:snippetId
		const request = new Request(getBaseUrl() + `user/code_snippet_info_annotations/${submissionId}/${codeSnippetId}`, {
			method: 'GET',
			credentials: 'include'
		})
		return fetchResponse(request)
	}

	static logoutOwner() {
		const request = new Request(getBaseUrl() + 'user_logout', {
	      method: 'GET',
	      credentials: 'include'
	    })
	    return fetchResponse(request)
	}

	static getLoggedInOwner() {
		const request = new Request(getBaseUrl() + 'current_user', {
	      method: 'GET',
	      credentials: 'include'
	    })
	    return fetchResponse(request)
	}

	static getAssignment(assignmentId) {
		const request = new Request(getBaseUrl() + `user/assignment/${assignmentId}`, {
	      method: 'GET',
	      credentials: 'include'
	    })
	    return fetchResponse(request)
	}

	static getResponse(responseId) {
	    const request = new Request(getBaseUrl() + `user/response/${responseId}`, {
	      method: 'GET',
	      credentials: 'include'
	    })
	    return fetchResponse(request)
	}

	static getResponseList() {
	    const request = new Request(getBaseUrl() + `user/response_list`, {
	      method: 'GET',
	      credentials: 'include'
	    })
	    return fetchResponse(request)
	}

	static getAssignmentList() {
	    const request = new Request(getBaseUrl() + `user/assignment_list`, {
	      method: 'GET',
	      credentials: 'include'
	    })
	    return fetchResponse(request)
	}

	// TODO: implement on server-side.
	static getResponsesForAssignment(assignmentId) {
		const request = new Request(getBaseUrl() + `user/response_list_for_assignment?assignmentId=${assignmentId}`, {
	      method: 'GET',
	      credentials: 'include'
	    })
	    return fetchResponse(request)
	}

	// TODO: verify the body of this request, once finalized on server-side.
	static createAssignment(assignment) {
		const request = new Request(getBaseUrl() + `user/assignment/`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				assignment: assignment
			})
		})
		return fetchResponse(request)
	}

	static createDemoAssignment(assignment) {
		assignment.isDemo = true
		const request = new Request(getBaseUrl() + `user/demo_assignment/`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				assignment: assignment
			})
		})
		return fetchResponse(request)
	}

	// TODO: verify the body of this request, once finalized on server-side.
	static assignToCandidate(assignmentId, candidateFirstName, candidateLastName, unlockPassword) {
		const request = new Request(getBaseUrl() + `user/assign_to_candidate/${assignmentId}`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				firstName: candidateFirstName,
				lastName: candidateLastName,
				unlockPassword: unlockPassword
			})
		})
		return fetchResponse(request)
	}
}

export default OwnerApi;