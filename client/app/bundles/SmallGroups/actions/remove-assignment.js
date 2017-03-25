import {
  REMOVE_ASSIGNMENT,
  REMOVE_ASSIGNMENT_FROM_GROUP,
  REMOVE_ASSIGNMENT_FROM_LESSON,
  REMOVE_LESSON_FROM_ASSIGNMENT,
} from './index';

import { destroyAssignment } from '../api';

export default function removeAssignment(assignment, teacherId) {
  return (dispatch) => {
    return destroyAssignment(assignment, teacherId)
    .then(() => {
      if (assignment.lessons) {
        assignment.lessons.forEach((lessonId) => {
          dispatch({ type: REMOVE_ASSIGNMENT_FROM_LESSON, lessonId, assignmentId: assignment.id });
          dispatch({ type: REMOVE_LESSON_FROM_ASSIGNMENT, assignmentId: assignment.id, lessonId });
        });
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
