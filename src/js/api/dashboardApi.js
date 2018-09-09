import { fetchResponse, getBaseUrl } from 'utility/util'

class DashboardApi {
    static getAssessmentList() {
        const request = new Request(getBaseUrl() + `assessments`, {
            method: 'GET',
            credentials: 'include'
        })
        return fetchResponse(request)
    }

    static getCandidateList(assignment) {
        const request = new Request(getBaseUrl() + `candidates`, {
            method: 'GET',
            credentials: 'include'
        })
        return fetchResponse(request)
    }

    static addCandidate(candidate) {
        const request = new Request(getBaseUrl() + `candidates`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(candidate.toJS())
        })
        return fetchResponse(request)
    }

}

export default DashboardApi;