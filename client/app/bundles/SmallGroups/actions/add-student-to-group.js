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
    // This is as complicated as all-get-out because I need to check against the previous group that a student was in, but when I switch groupings, this gets super confusing to do.

    const { groups, groupings } = getState();
    const grouping = groupings[group.groupingId];

    let sameGrouping = false;
    let switchGroupingView = false;

    const oldGroupId = stu.groupId;
    const oldGroup = groups[oldGroupId];

    if (oldGroupId){

      const checkOldGroup = grouping.groups.includes(oldGroupId);

      const checkNewGroup = grouping.groups.includes(group.id);

      sameGrouping = checkOldGroup && checkNewGroup;

      if (oldGroup.groupingId !== group.groupingId) {
          switchGroupingView = true;
      }
    }

    studentFromGroup(stu, teacherId)
    .then(() => {
      if (oldGroupId) {
        if (!switchGroupingView) {
          dispatch({ type: REMOVE_STUDENT_FROM_GROUP, studentId: stu.id, groupId: oldGroupId });
        } else {
          const oldGrouping = groupings[oldGroup.groupingId];

          let foundOldGroupId = '';
          if (oldGrouping) {
            const oldGroupInOldGrouping = oldGrouping.groups.includes(oldGroupId);

            if (oldGroupInOldGrouping) {
              const availableGroupIds = grouping.groups
              const allGroups = Object.values(groups);
              const availableGroups = allGroups.filter((g) => {
                return g.groupingId == grouping.id
              });

              availableGroups.forEach((g) => {
                if (g.students) {
                  let results = g.students.includes(stu.id);
                  if (results) {
                    foundOldGroupId = g.id;
                  }
                }
              })

              if (foundOldGroupId) {
                dispatch({ type: REMOVE_STUDENT_FROM_GROUP, studentId: stu.id, groupId: foundOldGroupId });
              }
            }
          }
        }
      }

      if(sameGrouping) {
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
