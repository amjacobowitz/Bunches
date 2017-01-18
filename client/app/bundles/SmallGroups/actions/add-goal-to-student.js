import {
  ADD_GOAL_TO_STUDENT,
  ADD_GOAL_TO_STUDENT_FAILURE
} from './index';

import { updateStudentGoal } from '../api';

export default function addGoalToStudent(studentId, goalId) {
  return (dispatch) => {
    return updateStudentGoal(studentId, goalId)
    .then((student) => {
      dispatch({ type: ADD_GOAL_TO_STUDENT, goalId, studentId })
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: ADD_GOAL_TO_STUDENT_FAILURE })
      throw err;
    })
  }
}
