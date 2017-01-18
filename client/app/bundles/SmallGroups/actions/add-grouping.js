import {
  ADD_GROUPING,
  ADD_GROUPING_FAILURE
} from './index';

import { createGrouping } from '../api';

export default function addGrouping(grping, teacherId) {
  return (dispatch) => {
    return createGrouping(grping, teacherId)
    .then((grouping) => {
      dispatch({ type: ADD_GROUPING, grouping });
    }).catch((err) => {
      console.warn(err)
      dispatch({ type: ADD_GROUPING_FAILURE })
      throw err;
    })
  }
}
