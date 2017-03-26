import {
  AUTH_TEACHER,
  FETCH_TEACHER,
  FETCH_TEACHER_FAILURE,
  ADD_ASSIGNMENTS,
  ADD_DAYS,
  ADD_GOALS,
  ADD_GROUPS,
  ADD_GROUPINGS,
  ADD_KLASSES,
  ADD_LESSONS,
  ADD_SUBMISSIONS,
  ADD_STUDENTS,
} from './index';

import { getTeacher } from '../api';

export default function fetchTeacher(teacherId) {
  return (dispatch) => {
    return getTeacher(teacherId)
    .then((t) => {
      dispatch({ type: AUTH_TEACHER, teacher: t });
      dispatch({ type: ADD_KLASSES, klasses: t.klasses });

      t.klasses.forEach((klass) => {
        dispatch({ type: ADD_STUDENTS, students: klass.students })
        dispatch({ type: ADD_GROUPINGS, groupings: klass.groupings });

        klass.groupings.forEach((grouping) => {
          dispatch({ type: ADD_GROUPS, groups: grouping.groups });
        })
      });

      dispatch({ type: ADD_ASSIGNMENTS, assignments: t.assignments });
      t.assignments.forEach((a) => {
        dispatch({ type: ADD_SUBMISSIONS, submissions: a.submissions });
      });
      dispatch({ type: ADD_LESSONS, lessons: t.lessons });
      dispatch({ type: ADD_GOALS, goals: t.goals });
      dispatch({ type: ADD_DAYS, days: t.days });
    }).catch((e) => {
      console.warn(e);
      dispatch({ type: FETCH_TEACHER_FAILURE });
    });
  };
}
