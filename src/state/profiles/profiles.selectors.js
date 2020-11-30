import { createSelector } from 'reselect';
import { find, filter } from 'lodash';
import { pluralizeName } from '/util';

import profileTypes from '/constants/profileTypes';

export const currentProfileCodeSelector = (state) => state.auth.profileCode;
export const profilesSelector = (state) => state.profiles.profiles;
export const profileIdListSelector = (state) => state.profiles.list;
const activeProfileCodeState = (state) => state.profiles.activeProfileCode;

export const currentProfileSelector = createSelector(
  currentProfileCodeSelector,
  profilesSelector,
  (code, allProfiles) => allProfiles[code],
);

export const profileListSelector = createSelector(
  profileIdListSelector,
  profilesSelector,
  (profileIds, allProfiles) => profileIds.map((pId) => allProfiles[pId]),
);

const isMasterProfile = (profile) => profile.profileType === profileTypes.Normal && profile.master;

export const masterProfileSelector = createSelector(
  profilesSelector,
  (profiles) => find(profiles, isMasterProfile) || profiles[0],
);

export const masterProfileCodeSelector = createSelector(
  masterProfileSelector,
  (masterProfile) => masterProfile && masterProfile.profileCode,
);

export const otherProfilesSelector = createSelector(
  profilesSelector,
  masterProfileCodeSelector,
  (profiles, masterCode) => filter(profiles, (profile) => profile.profileCode !== masterCode),
);

export const activeProfileSelector = createSelector(
  activeProfileCodeState,
  masterProfileSelector,
  profilesSelector,
  (activeProfileCode, masterProfile, profiles) => {
    if (activeProfileCode) {
      return find(profiles, (profile) => profile.profileCode === activeProfileCode);
    }

    if (masterProfile) {
      return masterProfile;
    }

    return undefined;
  },
);

export const activeProfileIsMasterSelector = createSelector(
  activeProfileCodeState,
  masterProfileCodeSelector,
  (profileCode, masterCode) => profileCode === masterCode,
);

export const activeProfileCodeSelector = createSelector(
  activeProfileCodeState,
  masterProfileCodeSelector,
  (activeProfileCode, masterProfileCode) => {
    if (activeProfileCode) {
      return activeProfileCode;
    }

    return masterProfileCode;
  },
);

export const determinerSelector = createSelector(
  activeProfileIsMasterSelector,
  activeProfileSelector,
  (isMaster, currentProfile) => {
    if (!currentProfile) return '';
    return (isMaster ? 'your' : pluralizeName(currentProfile.firstName));
  },
);

export const readOnlyActiveProfileSelector = createSelector(
  activeProfileSelector,
  (activeProfile) =>
    activeProfile && activeProfile.profileType === profileTypes.CareTeamReadonly,
);

export const writeAccessProfilesSelector = createSelector(
  profileListSelector,
  (profiles) => profiles.filter((profile) => profile.profileType !== profileTypes.CareTeamReadonly),
);

export const sharedProfileSelector = createSelector(
  activeProfileSelector,
  (activeProfile) =>
    activeProfile && activeProfile.profileType !== profileTypes.Normal,
);
