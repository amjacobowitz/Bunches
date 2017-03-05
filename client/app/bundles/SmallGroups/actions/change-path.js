import { CHANGE_PATH } from './index';
import { browserHistory } from 'react-router';

export default function changePath(path) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PATH });
    browserHistory.push(path);
  }
}
