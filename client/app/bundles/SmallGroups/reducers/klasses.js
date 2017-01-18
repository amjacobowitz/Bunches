import { createReducer } from 'redux-create-reducer';
import {
  ADD_KLASS,
  ADD_KLASSES,
  REMOVE_KLASS,
  ADD_STUDENT_TO_KLASS,
  REMOVE_STUDENT_FROM_KLASS,
  ADD_GROUPING_TO_KLASS,
  REMOVE_GROUPING_FROM_KLASS
} from '../actions/index';

const initialState = {};

const removeAssociation = (associationId, associations) => {
  const index = associations.indexOf(associationId);
  const before = associations.slice(0, index);
  const after = associations.slice(index + 1, associations.length);
  return before.concat(after);
};

const formatToObjs = (klasses) => {
  if (klasses) {
    const results = klasses.map((klass) => {
      return {
        [klass.id]: {
          id: klass.id,
          name: klass.name
        }
      };
    });
    return { ...results };
  } else {
    return {};
  }
}

const handlers = {
  [ADD_KLASS]: (state, { klass }) => {
    return { ...state, [klass.id]: { ...klass } };
  },
  [ADD_KLASSES]: (state, { klasses }) => {
    return formatToObjs(klasses);
  },
  [REMOVE_KLASS]: (state, { klassId }) => {
    delete state[klassId];
    return { ...state };
  },
  [ADD_STUDENT_TO_KLASS]: (state, { studentId, klassId }) => {
    const klass = state[klassId];
    return { ...state, [klassId]: { ...klass, students: klass.students.concat(studentId) } };
  },
  [REMOVE_STUDENT_FROM_KLASS]: (state, { studentId, klassId }) => {
    const klass = state[klassId];
    const students = removeAssociation(studentId, klass.students);
    return { ...state, [klassId]: { ...klass, students: students } };
  },
  [ADD_GROUPING_TO_KLASS]: (state, { groupingId, klassId }) => {
    const klass = state[klassId];
    return { ...state, [klassId]: { ...klass, grouping: klass.groupings.concat(groupingId) } };
  },
  [REMOVE_GROUPING_FROM_KLASS]: (state, { groupingId, klassId }) => {
    const klass = state[klassId];
    const groupings = removeAssociation(groupingId, klass.groupings);
    return { ...state, [klassId]: { ...klass, groupings: groupings } };
  },
}

export default createReducer(initialState, handlers);
