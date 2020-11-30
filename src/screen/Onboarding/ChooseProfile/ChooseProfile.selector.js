import { createSelector } from 'reselect';

import { masterProfileSelector, profileListSelector } from '/state/profiles/profiles.selectors';

export const chooseProfileScreenSelector = createSelector(
  masterProfileSelector,
  profileListSelector,
  (masterProfile, profiles) => ({
    masterProfile,
    profiles,
  }),
);

export default chooseProfileScreenSelector;
