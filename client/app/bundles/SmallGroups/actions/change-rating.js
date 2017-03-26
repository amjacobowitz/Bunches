import { CHANGE_RATING } from './index';

export default function changeRating(rating) {
  return (dispatch) => {
    dispatch({type: CHANGE_RATING, rating })
  }
}
