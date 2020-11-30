import { createSelector } from 'reselect';
import formatDate from 'date-fns/format';
import {
  activeProfileSelector,
  profileListSelector,
  masterProfileCodeSelector,
} from '/state/profiles/profiles.selectors';
import { maskSelector } from '/state/tutorial/tutorial.selectors';
import { format } from '/util';

export const manageProfileScreenSelector = createSelector(
  activeProfileSelector,
  profileListSelector,
  masterProfileCodeSelector,
  maskSelector,
  (activeProfile, profileList, masterProfileCode, mask) => {
    const isMasterProfile = activeProfile.profileCode === masterProfileCode;

    return {
      activeProfile: {
        ...activeProfile,
        dob: formatDate(format.APIDateToDate(activeProfile.dob), 'MM/dd/yyyy'),
      },
      profileList,
      isMasterProfile,
      masterProfileCode,
      isTutorialActive: mask.active,
    };
  },
);

export default manageProfileScreenSelector;
