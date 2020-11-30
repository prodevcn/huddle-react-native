/* eslint-disable import/prefer-default-export */
import * as types from './surveys.types';

export const setSurvey = (hash, onComplete) => ({
  type: types.SET_SURVEY,
  payload: {
    hash,
    onComplete,
  },
});
