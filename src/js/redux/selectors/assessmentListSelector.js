import { createSelector } from 'reselect';
// READ: https://github.com/reactjs/reselect

const selfSelector = createSelector(
  state => state.assessmentList,
  state => {
    return state.assessmentList
  }
)

const Selector = state => ({
  assessmentList: selfSelector(state)
});
export default Selector;