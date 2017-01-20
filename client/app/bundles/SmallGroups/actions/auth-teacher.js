import {
  AUTH_TEACHER,
  AUTH_TEACHER_FAILURE,
} from './index';

import { authorizeTeacher } from '../api';
import changePath from './change-path';
import fetchTeacher from './fetch-teacher';

export default function authTeacher(teacher) {
  return (dispatch) => {
    return authorizeTeacher(teacher)
    .then((t) => {
      return dispatch(fetchTeacher(t.id));
    }).then((t) => {
       dispatch({ type: AUTH_TEACHER, teacher: t });
       changePath(`teacher/${t.id}/dashboard`);
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: AUTH_TEACHER_FAILURE });
    });
  };
}
