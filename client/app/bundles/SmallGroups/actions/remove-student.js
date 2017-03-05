import {
  REMOVE_STUDENT,
  REMOVE_STUDENT_FROM_GOAL,
  REMOVE_STUDENT_FROM_GROUP,
  REMOVE_STUDENT_FAILURE,
} from './index';

import { destroyStudent } from '../api';

export default function removeStudent(stu, teacherId) {
  return (dispatch) => {
    return destroyStudent(stu, teacherId)
    .then(() => {
      if (stu.goalId) {
        dispatch({ type: REMOVE_STUDENT_FROM_GOAL, goalId: stu.goalId, studentId: stu.id });
      }

      if (stu.groupId) {
        dispatch({ type: REMOVE_STUDENT_FROM_GROUP, studentId: stu.id, groupId: stu.groupId });
      }

      dispatch({ type: REMOVE_STUDENT, studentId: stu.id });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: REMOVE_STUDENT_FAILURE });
      throw err;
    })
  }
}
