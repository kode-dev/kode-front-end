import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import appointmentList from './reducers/appointmentListReducer';
import assessmentList from './reducers/assessmentListReducer';

export default combineReducers({
  appointmentList,
  assessmentList,
  routing
});