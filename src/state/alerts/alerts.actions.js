import * as types from './alerts.types';

export const show = (data) => ({
  type: types.SHOW,
  payload: data,
});

export const dismiss = () => ({
  type: types.DISMISS,
});
