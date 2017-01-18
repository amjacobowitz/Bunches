import {
  ADD_GROUP,
  ADD_GROUP_FAILURE,
  ADD_GROUP_TO_GROUPING,
} from './index';

import { createGroup } from '../api';

export default function addGroup(groupingId) {
  return (dispatch) => {
    return createGroup(groupingId)
    .then((g) => {
      const group = {
        id: g.id,
        title: '',
        students: [],
        groupingId: groupingId
      };
      dispatch({ type: ADD_GROUP, group });
      dispatch({ type: ADD_GROUP_TO_GROUPING, groupId: g.id, groupingId });
    }).catch((err) => {
      console.warn(err)
      dispatch({ type: ADD_GROUP_FAILURE })
      throw err;
    })
  }
}
