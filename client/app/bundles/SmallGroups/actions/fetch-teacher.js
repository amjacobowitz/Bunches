import {
  FETCH_TEACHER,
  FETCH_TEACHER_FAILURE,
  ADD_ASSIGNMENTS,
  ADD_GOALS,
  ADD_GROUPS,
  ADD_GROUPINGS,
  ADD_KLASSES,
  ADD_LESSONS,
  ADD_STUDENTS
} from './index';

import { getTeacher } from '../api';

export default function fetchTeacher(teacherId) {
  return (dispatch) => {
    return getTeacher(teacherId)
    .then((t) => {
      dispatch({ type: ADD_KLASSES, klasses: t.klasses });

      t.klasses.forEach((klass) => {
        dispatch({ type: ADD_STUDENTS, students: klass.students })
        dispatch({ type: ADD_GROUPINGS, groupings: klass.groupings });

        klass.groupings.forEach((grouping) => {
          dispatch({ type: ADD_GROUPS, groups: grouping.group });
        })

        klass.students.forEach((student) => {
          dispatch({ type: ADD_GOALS, goals: student.goals });
        })
      });

      dispatch({ type: ADD_ASSIGNMENTS, assignments: t.assignments });
      dispatch({ type: ADD_LESSONS, lessons: t.lessons });
    }).catch((e) => {
      console.warn(e);
      dispatch({ type: FETCH_TEACHER_FAILURE });
    });
  };
}
