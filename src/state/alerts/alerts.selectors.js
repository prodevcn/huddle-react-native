import { createSelector } from 'reselect';

export const alertsSelector = (state) => state.alerts.alerts;

export const activeAlertSelector = createSelector(
  alertsSelector,
  (alerts) => (alerts[0]),
);
