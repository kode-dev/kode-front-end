import { createSelector } from 'reselect';
// READ: https://github.com/reactjs/reselect

const selfSelector = createSelector(
  state => state.appointmentList,
  state => {
    return state.appointmentList
  }
)
const Selector = state => ({
  appointmentList: selfSelector(state)
});
export default Selector;