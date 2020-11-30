import { createSelector } from 'reselect';

import {
  otherProfilesSelector,
  masterProfileSelector,
  activeProfileCodeSelector,
} from '/state/profiles/profiles.selectors';

export const profilesScreenSelector = createSelector(
  masterProfileSelector,
  otherProfilesSelector,
  activeProfileCodeSelector,
  (masterProfile, otherProfiles, activeProfileCode) => ({
    masterProfile,
    otherProfiles,
    activeProfileCode,
  }),
);

export default profilesScreenSelector;
