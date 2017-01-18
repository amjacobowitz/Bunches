import { SELECT_DATE } from './index';

export default function selectDate(date) {
  return (dispatch) => {
    dispatch({ type: SELECT_DATE, date });
  }
}
