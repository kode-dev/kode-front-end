import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import candidateList from './reducers/candidateListReducer';
import assessmentList from './reducers/assessmentListReducer';

export default combineReducers({
  candidateList,
  assessmentList,
  routing
});