import { CHANGE_TITLE } from './index';

export default function changeTitle(assignmentId, title) {
  return (dispatch) => {
    dispatch({type: CHANGE_TITLE, assignmentId, title })
  }
}
