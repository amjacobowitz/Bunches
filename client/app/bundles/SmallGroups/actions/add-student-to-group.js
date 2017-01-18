import {
  ADD_STUDENT_TO_GROUP,
  ADD_STUDENT_TO_GROUP_FAILURE,
  ADD_GROUP_TO_STUDENT,
  REMOVE_STUDENT_FROM_GROUP,
  REMOVE_GROUP_FROM_STUDENT,
  REMOVE_STUDENT
} from './index';

import { studentFromGroup, studentToGroup } from '../api';

export default function addStudentToGroup(stu, group, teacherId) {
  return (dispatch, getState) => {
    const { groups, groupings } = getState();
    //Occasionally, when there is only one member in all groups, it is doubling the association.
    const grouping = groupings[group.groupingId];

    let sameGrouping = false;
    const oldGroupId = stu.groupId;

    if (oldGroupId) {
      const checkOldGroup = grouping.groups.includes(oldGroupId);

      const checkNewGroup = grouping.groups.includes(group.id);

      sameGrouping = checkOldGroup && checkNewGroup;
    }
    studentFromGroup(stu, teacherId)
    .then(() => {
      if(sameGrouping) {
        dispatch({ type: REMOVE_STUDENT_FROM_GROUP, studentId: stu.id, groupId: oldGroupId });
        dispatch({ type: REMOVE_GROUP_FROM_STUDENT, studentId: stu.id, groupId: 'temp' });
      }
      return studentToGroup(stu, group.id, teacherId)
    }).then((student) => {
      dispatch({ type: ADD_STUDENT_TO_GROUP, studentId: student.id, groupId: group.id });
      dispatch({ type: ADD_GROUP_TO_STUDENT, studentId: student.id, groupId: group.id,});
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: ADD_STUDENT_TO_GROUP_FAILURE });
      throw err;
    })
  }
}
