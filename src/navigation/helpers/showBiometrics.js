/**
 * This helper will show the Biometrics onboarding screen if the device is compatible,
 * or will dismiss the current modal stack otherwise
 */
import { store } from '/state/store';
import screens from '/screen';
import { actions } from '/state/biometricAuthSettings';

/**
 * @param {object} navigation
 * @param {boolean} showProfileChooser
 * if biometric auth is not setup on this device, should we take the
 * user to the profile chooser screen? The answer is probably yes -
 * The only time we don't want to is if there is already a current profile
 */
export default async (navigation, showProfileChooser) => {
  const isSupported = await store.dispatch(actions.checkBiometricSupport());

  if (isSupported) {
    navigation.push(screens.OnboardingBiometrics);
  } else if (showProfileChooser) {
    navigation.push(screens.OnboardingChooseProfile);
  } else {
    navigation.dismiss();
  }
};
