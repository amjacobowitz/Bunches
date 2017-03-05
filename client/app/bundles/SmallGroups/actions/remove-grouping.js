import {
  REMOVE_GROUP,
  REMOVE_GROUPING,
  REMOVE_GROUPING_FAILURE
} from './index';

import { destroyGrouping } from '../api';

export default function removeGrouping(grouping, teacherId) {
  return (dispatch, getState) => {
    const { groupings } = getState();
    return destroyGrouping(grouping, teacherId)
    .then(() => {
      grouping.groups.forEach((groupId) => {
        dispatch({ type: REMOVE_GROUP, groupId });
      });
      dispatch({ type: REMOVE_GROUPING, groupingId: grouping.id });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: REMOVE_GROUPING_FAILURE });
      throw err;
    })
  }
}
