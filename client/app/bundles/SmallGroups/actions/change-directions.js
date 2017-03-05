import { CHANGE_DIRECTIONS } from './index';

export default function changeDirections(assignmentId, directions) {
  return (dispatch) => {
    dispatch({type: CHANGE_DIRECTIONS, assignmentId, directions })
  }
}
