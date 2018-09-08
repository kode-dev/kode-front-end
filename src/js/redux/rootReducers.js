import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import candidateList from './reducers/candidateListReducer';
export default combineReducers({
  candidateList,
  routing
});