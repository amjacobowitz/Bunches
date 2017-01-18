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

import { authorizeTeacher } from '../api';
import changePath from './change-path';

export default function fetchTeacher(teacher) {
  return (dispatch) => {
    return authorizeTeacher(teacher).then((t) => {
      dispatch({ type: FETCH_TEACHER, teacher: t });

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

      changePath(`teacher/${t.id}/dashboard`);
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: FETCH_TEACHER_FAILURE });
    });
  };
}
