export function getBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return "http://localhost:3000/"
  } else if (process.env.NODE_ENV === 'production') {
    return "https://kode-review-server.herokuapp.com/"
  } else {
    return "https://api.kodereview.io/"
  }
}

export function fetchResponse(request) {
  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function getSubmissionUrlFromId(id) {
  return getBaseUrl() + '#/submission/' + id
}

// TODO: actually make this work.
import moment from 'moment'
export function getHumanReadableTime(datetimeString) {
  return moment(datetimeString).format("M/D/YYYY H:mm")

}

export function createAsyncAction (type, fn) {
  return (...args) => async(dispatch, getState) => {
    // add current state and dispatch to arguments to let functions access them.
    args.push(getState());
    args.push(dispatch);
    dispatch({
      type: `${type}_STARTED`,
      payload: args
    });
    let result;
    try {
      result = await fn(...args);
    } catch (error) {
      dispatch({
        type: `${type}_FAILED`,
        error: true,
        payload: error
      });
      throw error;
    }
    dispatch({
      type: `${type}_ENDED`,
      payload: result
    });
    return result;
  }
}

export function getTimeLimitString(assignmentTimeLimit) {
  if (assignmentTimeLimit) {
    if (assignmentTimeLimit < 60) return assignmentTimeLimit.toString() + ' seconds'
    let numMins = assignmentTimeLimit / 60
    if (numMins > 60) {
      return Math.floor(numMins/60).toString() + ":" + (numMins%60).toString() + " hours"
    }
    return Math.floor(numMins).toString() + " minutes"
  } else {
    return ""
  }
}

export function getTimeStringFromUTCSeconds(s) {
  let d = new Date(0)
  d.setUTCSeconds(s)
  return d.toString()
}

export function getTimeLeftString(timeLeft) {
  if (!timeLeft) return ""
  var timeString = ""
  if (timeLeft < 60) timeString = timeLeft + "s"
  else if (timeLeft <= 0) timeString = "No time"
  else if (timeLeft >= 60 && timeLeft < 3600)
    timeString = new Date(timeLeft * 1000).toISOString().substr(11, 8).substr(3)
  else timeString = new Date(timeLeft * 1000).toISOString().substr(11, 8)
  return timeString + " left"
}

export function hasTimeRunOut(startTime, timeLimitSeconds) {
  return false;
}
