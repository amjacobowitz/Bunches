import {
  UPDATE_GROUP_NAME
} from './index';

import { updateGroupName } from '../api';

export default function changeGroupName(groupId, name) {
  return (dispatch) => {
    return updateGroupName(groupId, name)
    .then((group) => {
      dispatch({ type: UPDATE_GROUP_NAME, group });
    }).catch((err) => {
      console.warn(err);
      throw err;
    })
  }
}
