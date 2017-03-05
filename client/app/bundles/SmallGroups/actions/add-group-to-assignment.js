import {
  ADD_GROUP_TO_ASSIGNMENT,
  ADD_GROUP_TO_ASSIGNMENT_FAILURE,
  ADD_ASSIGNMENT_TO_GROUP,
  ADD_ASSIGNMENT_TO_GROUP_FAILURE
} from './index';

import { groupToAssignment } from '../api';

export default function addGroupToAssignment(group, assignment) {
  return (dispatch) => {
    groupToAssignment(assignment.id, group.id)
    .then((assign) => {
      dispatch({ type: ADD_GROUP_TO_ASSIGNMENT, groupId: group.id, assignmentId: assignment.id });
      dispatch({ type: ADD_ASSIGNMENT_TO_GROUP, groupId: group.id, assignmentId: assignment.id });
    }).catch((e) => {
      console.warn(e);
    });
  }
}
