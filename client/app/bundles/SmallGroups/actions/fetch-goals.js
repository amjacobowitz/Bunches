import {
  FETCH_GOALS,
  FETCH_GOALS_FAILRE
} from './index';

import { getGoals } from '../api';

export default function fetchGoals() {
  return (dispatch) => {
    return getGoals()
    .then((goals) => {
      dispatch({ type: FETCH_GOALS, goals });
    }).catch((err) => {
      dispatch({ type: FETCH_GOALS_FAILURE });
      throw err;
    })
  }
}

