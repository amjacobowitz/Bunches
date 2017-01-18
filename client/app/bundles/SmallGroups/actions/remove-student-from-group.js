import {
  REMOVE_STUDENT_FROM_GROUP,
  REMOVE_GROUP_FROM_STUDENT,
  REMOVE_STUDENT_FROM_GROUP_FAILURE,
} from './index';

import { studentFromGroup } from '../api';

export default function removeStudentFromGroup(stu, group, teacherId) {
  return (dispatch) => {
    return studentFromGroup(stu, teacherId)
    .then((student) => {
      dispatch({ type: REMOVE_STUDENT_FROM_GROUP, studentId: stu.id, groupId: group.id });
      dispatch({ type: REMOVE_GROUP_FROM_STUDENT, studentId: stu.id });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: REMOVE_STUDENT_FROM_GROUP_FAILURE });
      throw err;
    })
  }
}
