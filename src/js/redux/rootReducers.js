import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import submission from './modules/submission';
import owner from './modules/owner';

export default combineReducers({
  submission,
  owner,
  routing,
});