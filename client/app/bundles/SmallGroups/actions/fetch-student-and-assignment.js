import fetchStudent from './fetch-student';
import fetchAssignment from './fetch-assignment';

export default function fetchStudentAndAssignment(id) {
  return (dispatch, getState) => {
    return dispatch(fetchStudent(id)).then(() => {
      const { student: { group } } = getState();

      dispatch(fetchAssignment(group.id));
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: AUTH_STUDENT_FAILURE })
      throw err;
    });
  };
}
