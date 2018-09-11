import { createSelector } from 'reselect';
// READ: https://github.com/reactjs/reselect

const selfSelector = createSelector(
  state => state.appointmentList,
  state => {
  	return state
  }
)
const Selector = state => (selfSelector(state));

export default Selector;