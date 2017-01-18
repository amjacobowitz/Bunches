import { createSelector } from 'reselect';

const getKlasses = (state) => state.klasses;

export const allKlasses = createSelector(
  [getKlasses],
  (klasses) => {
    return Object.values(klasses);
  }
)
