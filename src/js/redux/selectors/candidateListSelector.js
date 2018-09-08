import { createSelector } from 'reselect';
// READ: https://github.com/reactjs/reselect

const selfSelector = createSelector(
  state => state.candidateList,
  state => {
    return state.candidateList
  }
)

export default const selector = state => ({
  candidateList: selfSelector(state)
});