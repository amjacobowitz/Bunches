import { createSelector } from 'reselect';

const getGoals = (goals) => goals;

export const selectAllGoals = createSelector(
  [getGoals],
  (goals) => {
    return Object.values(goals);
  }
)
