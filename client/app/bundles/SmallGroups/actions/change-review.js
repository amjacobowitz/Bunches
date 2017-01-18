import { CHANGE_REVIEW } from './index';

export default function changeReview(body) {
  return (dispatch) => {
    dispatch({type: CHANGE_REVIEW, body })
  }
}
