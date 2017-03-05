import {
  REMOVE_ASSIGNMENT_FROM_GROUP,
  REMOVE_GROUP_FROM_ASSIGNMENT
} from './index';

import { groupFromAssignment } from '../api';

export default function removeGroupFromAssignment(assignmentId, groupId) {
  return (dispatch) => {
    groupFromAssignment(assignmentId, groupId)
    .then((g) => {
      dispatch({ type: REMOVE_ASSIGNMENT_FROM_GROUP, assignmentId, groupId });
      dispatch({ type: REMOVE_GROUP_FROM_ASSIGNMENT, assignmentId, groupId });
    }).catch((e) => {
      console.warn(e);
    });
  }
}
