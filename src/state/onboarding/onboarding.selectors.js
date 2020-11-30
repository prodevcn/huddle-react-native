import { createSelector } from 'reselect';

import { biometricAuthEnabledSelector } from '/state/biometricAuthSettings/biometricAuthSettings.selectors';
import { accessTokenSelector } from '/state/auth/auth.selectors';

const newUserSelector = (state) => state.onboarding.newUser;
export const onboardingDismissedSelector = (state) => state.onboarding.onboardingDismissed;

export const hasEmailOrPhone = (state) =>
  state.onboarding.data.mobile
  || state.onboarding.data.email;

export const flowSelector = (state) => state.onboarding.flow;
export const hasSuggestion = (state) => !!state.onboarding.suggestionData;
export const suggestionDataSelector = (state) => state.onboarding.suggestionData || {};
export const registeringAsCaregiverSelector = (state) =>
  state.onboarding.registeringAsCaregiver;

export const onboardingSelector = createSelector(
  biometricAuthEnabledSelector,
  accessTokenSelector,
  (useBioAuth, accessToken) => ({
    accessToken, useBioAuth,
  }),
);

// We want to show the user the welcome tutorial after the **signup** and only
// the first time they see the huddle home screen
export const showWelcomeTutorialSelector = createSelector(
  newUserSelector,
  onboardingDismissedSelector,
  (newUser, dismissed) => newUser && dismissed,
);
