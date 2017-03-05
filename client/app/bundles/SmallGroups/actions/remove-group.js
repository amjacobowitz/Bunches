import {
  REMOVE_GROUP,
  REMOVE_GROUP_FAILURE,
  REMOVE_STUDENT_FROM_GROUP,
  REMOVE_GROUP_FROM_STUDENT,
  REMOVE_GROUP_FROM_GROUPING,
} from './index';

import { destroyGroup } from '../api';

export default function removeGroup(group) {
  return (dispatch) => {
    return destroyGroup(group)
    .then(() => {
      group.students.forEach((studentId) => {
        dispatch({ type: REMOVE_STUDENT_FROM_GROUP, studentId, groupId: group.id });
        dispatch({ type: REMOVE_GROUP_FROM_STUDENT, studentId, groupId: '' });
      })
      dispatch({ type: REMOVE_GROUP_FROM_GROUPING, groupId: group.id, groupingId: group.groupingId });
      dispatch({ type: REMOVE_GROUP, groupId: group.id });
    }).catch((err) => {
      console.warn(err)
      dispatch({ type: REMOVE_GROUP_FAILURE })
      throw err;
    })
  }
}
