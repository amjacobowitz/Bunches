import { createSelector } from 'reselect';

const getGroupings = (groupings) => groupings;

export const selectAllGroupings = createSelector(
  [getGroupings],
  (groupings) => {
    return Object.values(groupings);
  }
)
