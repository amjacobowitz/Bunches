import { CHANGE_REVIEW } from './index';

export default function changeReview(review) {
  return (dispatch) => {
    dispatch({type: CHANGE_REVIEW, review })
  }
}
