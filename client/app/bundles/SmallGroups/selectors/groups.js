import { createSelector } from 'reselect';

const getGroups = (groups) => groups;

export const selectAllGroups = createSelector(
  [getGroups],
  (groups) => {
    return Object.values(groups);
  }
)

export function selectAllGroupsInGrouping(groups, groupingId) {
  const allGroups = selectAllGroups(groups);
  const groupsInGrouping = allGroups.filter((group) => {
    return group.groupingId == groupingId
  })
  return groupsInGrouping;
}
