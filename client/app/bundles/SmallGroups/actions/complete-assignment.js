import {
  COMPLETE_ASSIGNMENT,
} from './index';

import changePath from './change-path';

export default function completeAssignment() {
  return (dispatch, getState) => {
    const { student: { id } } = getState();

    dispatch({ type: COMPLETE_ASSIGNMENT });
    changePath(`/student/${id}/review`);
  }
}
