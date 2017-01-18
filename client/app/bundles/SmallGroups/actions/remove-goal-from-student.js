import {
  REMOVE_GOAL_FROM_STUDENT,
  REMOVE_GOAL_FROM_STUDENT_FAILURE
} from './index';

import { updateStudentGoal } from '../api';

export default function removeGoalFromStudent(studentId, goalId) {
  return (dispatch) => {
    return updateStudentGoal(studentId, goalId)
    .then((student) => {
      dispatch({ type: REMOVE_GOAL_FROM_STUDENT, goalId, studentId })
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: REMOVE_GOAL_FROM_STUDENT_FAILURE })
      throw err;
    })
  }
}
