import { CHANGE_TITLE } from './index';

export default function changeTitle(title) {
  return (dispatch) => {
    dispatch({type: CHANGE_TITLE, title })
  }
}
