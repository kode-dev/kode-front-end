import { fetchResponse, getBaseUrl } from 'utility/util'

class SubmissionApi {
  static logoutCandidate() {
    const request = new Request(getBaseUrl() + 'candidate_logout', {
      method: 'GET',
      credentials: 'include'
    })
    return fetchResponse(request)
  }

  static isUserLoggedIn() {
    const request = new Request(getBaseUrl() + `is_candidate_logged_in/`, {
      method: 'GET',
      credentials: 'include'
    })
    return fetchResponse(request)
  }

  static getSubmission(id) {
    const request = new Request(getBaseUrl() + `response/${id}`, {
      method: 'GET',
      credentials: 'include'
    })
    return fetchResponse(request)
  }

  static getCodeSnippetAndAnnotations(submissionId, codeSnippetId) {
    // /annotations_for_snippet/:responseId/:snippetId
    const request = new Request(getBaseUrl() + `code_snippet_info_annotations/${submissionId}/${codeSnippetId}`, {
      method: 'GET',
      credentials: 'include'
    })
    return fetchResponse(request)
  }

  static loginCandidate(id, unlockPassword) {
    const request = new Request(getBaseUrl() + `candidate_login/${id}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({unlockPassword: unlockPassword})
    })
    return fetchResponse(request)
  }

  static start(id) {
    const request = new Request(getBaseUrl() + `response/start/${id}`, {
      method: 'POST',
      credentials: 'include'
    })
    return fetchResponse(request)
  }

  static submit(id) {
    const request = new Request(getBaseUrl() + `response/submit/${id}`, {
      method: 'POST',
      credentials: 'include'
    })
    return fetchResponse(request)
  }

  // ANNOTATION API CALLS:
  static createAnnotation(submissionId, codeSnippetId, annotation) {
    annotation.codeSnippetId = codeSnippetId
    const request = new Request(getBaseUrl() + `annotation/${submissionId}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({annotation: annotation})
    })
    return fetchResponse(request)
  }

  static deleteAnnotation(submissionId, annotationId) {
    const request = new Request(getBaseUrl() + `annotation/${submissionId}`, {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({id: annotationId})
    })
    return fetchResponse(request)
  }

  static updateAnnotationNoteText(submissionId, annotationId, noteText) {
    const request = new Request(getBaseUrl() + `annotation/${submissionId}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({
        id: annotationId,
        noteText: noteText
      })
    })
    return fetchResponse(request)
  }
}

export default SubmissionApi;
