import { createSelector } from 'reselect';
import { get } from 'lodash';

import { biometricAuthSettingsSelector } from '/state/biometricAuthSettings/biometricAuthSettings.selectors';
import { masterProfileSelector, profilesSelector } from '/state/profiles/profiles.selectors';

export const settingsScreenSelector = createSelector(
  biometricAuthSettingsSelector,
  masterProfileSelector,
  profilesSelector,
  (biometricAuthSettings, masterProfile, profilesList) => {
    const currentEmail = get(masterProfile, 'custom.email', 'Add an email');
    const currentPhoneNumber = get(masterProfile, 'custom.mobile', 'Add a phone number');

    return {
      ...biometricAuthSettings,
      profilesList,
      currentEmail,
      currentPhoneNumber,
    };
  },
);

export default settingsScreenSelector;
