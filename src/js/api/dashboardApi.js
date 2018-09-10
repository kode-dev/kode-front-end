import { fetchResponse, getBaseUrl } from 'utility/util'

class DashboardApi {
    static getAssessmentList() {
        const request = new Request(getBaseUrl() + `assessments`, {
            method: 'GET',
            credentials: 'include'
        })
        return fetchResponse(request)
    }

    static getAppointmentList() {
        const request = new Request(getBaseUrl() + `appointments`, {
            method: 'GET',
            credentials: 'include'
        })
        return fetchResponse(request)
    }

    static addAppointment(appointment) {
        const request = new Request(getBaseUrl() + `appointments`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(appointment)
        })
        return fetchResponse(request)
    }
}

export default DashboardApi;