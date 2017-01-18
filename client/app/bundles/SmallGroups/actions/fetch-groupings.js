import {
  FETCH_GROUPINGS,
  FETCH_GROUPINGS_FAILURE
} from './index';

import { getGroupings } from '../api';

export default function fetchGroupings(klassId) {
  return (dispatch) => {
    return getGroupings(klassId)
    .then((groupings) => {
      dispatch({ type: FETCH_GROUPINGS, groupings });
    }).catch((err) => {
      dispatch({ type: FETCH_GROUPINGS_FAILURE });
      throw err;
    });
  };
}
