import {
  ADD_GOAL_TO_STUDENT,
  REMOVE_GOALS_FROM_STUDENT,
  ADD_GOAL_TO_STUDENT_FAILURE
} from './index';

import { createGoal } from '../api';

export default function addGoalToStudents(description, group) {
  return (dispatch, getState) => {
    const { students } = getState();

    return createGoal(description, group.id)
    .then((g) => {
      const withGoals = Object.values(students).filter((s) => {
        return s.goals.length >= 1
      });

      withGoals.forEach((s) => {
        dispatch({ type: REMOVE_GOALS_FROM_STUDENT, goalId: g.id, studentId: s.id });
      });

      group.students.forEach((studentId) => {
        dispatch({ type: ADD_GOAL_TO_STUDENT, goalId: g.id, studentId })
      });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: ADD_GOAL_TO_STUDENT_FAILURE });
      throw err;
    })
  }
}
