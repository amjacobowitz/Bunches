import {
  ADD_GOAL,
  UPDATE_GOAL_DESCRIPTION,
  ADD_GOAL_TO_STUDENT,
  ADD_GOAL_TO_GROUP,
  ADD_STUDENT_TO_GOAL,
  ADD_GROUP_TO_GOAL,
  ADD_GOAL_TO_STUDENT_FAILURE
} from './index';

import { createGoal, updateGoal } from '../api';

export default function addGoalToStudents(description, group, studentIds, teacherId) {
  return (dispatch, getState) => {
    const { students, goals } = getState();

    if (group.goalId) {
      var promise = updateGoal(description, studentIds, group.goalId);
    } else {
      var promise = createGoal(description, group.id, studentIds, teacherId);
    }

    promise.then((g) => {
      if (!group.goalId) {
        dispatch({ type: ADD_GOAL, goal: g });
        dispatch({ type: ADD_GROUP_TO_GOAL, goalId: g.id, groupId: group.id });
      } else {
        const goal = goals[g.id];

        dispatch({ type: UPDATE_GOAL_DESCRIPTION, goal: g });
        g.students.forEach((s) => {
          if (!goal.students.includes(s.id)) {
            dispatch({ type: ADD_STUDENT_TO_GOAL, goalId: g.id, studentId: s.id });
          }
        });
      }

      group.students.forEach((studentId) => {
        dispatch({ type: ADD_GOAL_TO_STUDENT, goalId: g.id, studentId })
      });

      dispatch({ type: ADD_GOAL_TO_GROUP, goalId: g.id, groupId: group.id });

    }).catch((err) => {
      console.warn(err);
      dispatch({ type: ADD_GOAL_TO_STUDENT_FAILURE });
      throw err;
    })
  }
}
