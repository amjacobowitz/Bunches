import {
  AUTH_TEACHER_FAILURE,
} from './index';

import { authorizeTeacher } from '../api';
import changePath from './change-path';
import fetchTeacher from './fetch-teacher';

export default function authTeacher(teacher) {
  return (dispatch) => {
    return authorizeTeacher(teacher)
    .then((t) => {
      dispatch(fetchTeacher(t.id));
      return t;
    }).then((t) => {
       dispatch(changePath(`/teacher/${t.id}/dashboard`));
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: AUTH_TEACHER_FAILURE });
    });
  };
}
