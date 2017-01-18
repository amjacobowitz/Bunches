import { CHANGE_DIRECTIONS } from './index';

export default function changeDirections(directions) {
  return (dispatch) => {
    dispatch({type: CHANGE_DIRECTIONS, directions })
  }
}
