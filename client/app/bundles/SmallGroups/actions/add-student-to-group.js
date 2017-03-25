import {
  ADD_STUDENT_TO_GROUP,
  ADD_STUDENT_TO_GROUP_FAILURE,
  ADD_GROUP_TO_STUDENT,
  REMOVE_STUDENT_FROM_GROUP,
  REMOVE_GROUP_FROM_STUDENT,
  REMOVE_STUDENT,
  ADD_GOAL_TO_STUDENT,
  ADD_GOAL_TO_STUDENT_FAILURE,
  REMOVE_STUDENT_FROM_GOAL,
  ADD_STUDENT_TO_GOAL,
  ADD_STUDENT_TO_GOAL_FAILURE,
} from './index';

import { updateGoal, studentFromGroup, studentToGroup } from '../api';

export default function addStudentToGroup(stu, group) {
  return (dispatch, getState) => {
    const { groups, groupings } = getState();
    const studentGroups = stu.groups;

    studentToGroup(stu, group.id)
    .then((gp) => {
      if (stu.fromGroup && stu.fromGroup.groupingId == group.groupingId) {
        dispatch({ type: REMOVE_STUDENT_FROM_GROUP, studentId: stu.id, groupId: stu.fromGroup.id });
        dispatch({ type: REMOVE_GROUP_FROM_STUDENT, studentId: stu.id, groupId: stu.fromGroup.id });
        return studentFromGroup(stu, stu.fromGroup.id);
     }
    }).then(() => {
      dispatch({ type: ADD_STUDENT_TO_GROUP, studentId: stu.id, groupId: group.id });
      dispatch({ type: ADD_GROUP_TO_STUDENT, studentId: stu.id, groupId: group.id,});
      if (group.goalId) {
        updateGoal('', [stu.id], group.goalId);
        dispatch({ type: REMOVE_STUDENT_FROM_GOAL, goalId: group.goalId, studentId: stu.id });
        dispatch({ type: ADD_GOAL_TO_STUDENT, goalId: group.goalId, studentId: stu.id });
        dispatch({ type: ADD_STUDENT_TO_GOAL, goalId: group.goalId, studentId: stu.id });
      }
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: ADD_STUDENT_TO_GROUP_FAILURE });
      throw err;
    })
  }
}
