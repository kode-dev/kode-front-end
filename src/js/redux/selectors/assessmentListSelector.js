import { createSelector } from 'reselect';
// READ: https://github.com/reactjs/reselect

const selfSelector = createSelector(
  state => state.assessmentList,
  state => {
    return state.assessmentList
  }
)

export default const selector = state => ({
  assessmentList: selfSelector(state)
});