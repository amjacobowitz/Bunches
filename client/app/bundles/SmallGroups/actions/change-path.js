import { CHANGE_PATH } from './index';
import { browserHistory } from 'react-router';

export default function changePath(path) {
  browserHistory.push(path);
}
