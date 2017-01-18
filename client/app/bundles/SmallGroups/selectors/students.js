import { createSelector } from 'reselect';

const getStudents = (students) => students;

export const selectAllStudents = createSelector(
  [ getStudents ],
  (students) => {
    return Object.values(students);
  }
);

export function selectStudentsWithoutGroupsInGrouping(students, groups, groupingId) {
  const allGroups = Object.values(groups);

  const groupsInGrouping = allGroups.filter((group) => {
    return group.groupingId == groupingId
  })

  const studentsIdsInGroups = groupsInGrouping.map((group) => {
    return group.students.map((studentId) => {
      return studentId
    });
  });

  const flattenedStudentIds = studentsIdsInGroups.reduce((a, b) => {
    return a.concat(b);
  }, []);

  const allStudentIds = Object.keys(students);

  flattenedStudentIds.forEach((studentId) => {
    allStudentIds.forEach((sId, i) => {
      if (studentId == sId) {
        allStudentIds.splice(i, 1)
      }
    })
  })

  const studentsWithoutGroupsInGrouping = allStudentIds.map((studentId) => {
    return Object.values(students).find((student) => {
      return student.id == studentId
    })
  })

  return studentsWithoutGroupsInGrouping;
}
