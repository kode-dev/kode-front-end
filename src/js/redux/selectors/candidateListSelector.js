import { createSelector } from 'reselect';
// READ: https://github.com/reactjs/reselect

const selfSelector = createSelector(
  state => state.candidateList,
  state => {
    return state.candidateList
  }
)
const Selector = state => ({
  candidateList: selfSelector(state)
});
export default Selector;