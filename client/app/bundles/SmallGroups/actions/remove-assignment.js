import {
  REMOVE_ASSIGNMENT,
  REMOVE_ASSIGNMENT_FROM_GROUP,
  REMOVE_ASSIGNMENT_FROM_LESSON,
} from './index';

import { destroyAssignment } from '../api';

export default function removeAssignment(assignment, teacherId) {
  return (dispatch) => {
    return destroyAssignment(assignment, teacherId)
    .then(() => {

      if (assignment.lessonId) {
        dispatch({ type: REMOVE_ASSIGNMENT_FROM_LESSON, lessonId: assignment.lessonId, assignmentId: assignment.id })
      }

      if (assignment.groups) {
        assignment.groups.forEach((groupId) => {
          dispatch({ type: REMOVE_ASSIGNMENT_FROM_GROUP, assigmentId: assignment.id, groupId });
        });
      }

      dispatch({ type: REMOVE_ASSIGNMENT, assignmentId: assignment.id });
    }).catch((e) => {
      console.warn(e);
    })
  }
}
