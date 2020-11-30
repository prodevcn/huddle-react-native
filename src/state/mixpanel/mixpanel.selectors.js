import { createSelector } from 'reselect';

const selectMixpanel = (state) => state.mixpanel;

const makeSelectMixpanelReferrer = createSelector(
  selectMixpanel,
  (mixpanelState) => mixpanelState.referrer,
);

export default {
  makeSelectMixpanelReferrer,
};
