import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { secureStorage } from '/util';
import onboardingHelper from '/util/onboardingHelper';
import { selectors, actions } from '/state/onboarding';
import SplashScreen from 'react-native-splash-screen';

import Text from '/component/Text';
import Button from '/component/Button';

import screens from '/screen';
import { actions as mixpanelActions } from '/state/mixpanel';
import { actions as biometricAuthActions } from '/state/biometricAuthSettings';
import * as loginEvents from '/constants/events/Login/landingPage';
import BackHandler from '/util/backHandler';

import logo from 'assets/logo/logo-dark.png';
import onboarding from 'assets/illustrations/onboarding.png';

import onboardingStyles from '/screen/Onboarding/Onboarding.styles';
import styles from './Onboarding.styles';

import offlineMode from '/util/offlineMode';

const Onboarding = ({
  clearFormData,
  checkBiometricSupport,
  navigation,
  accessToken,
  useBioAuth,
  login,
  trackEvent,
}) => {
  const [imageSize, setImageSize] = useState(null);
  const userHasBeenDirected = useRef(null);

  useEffect(() => {
    const directUser = async () => {
      if (!imageSize) return;
      userHasBeenDirected.current = true;

      let validationCode;

      // If this fails, there is no validationCode in the keychain, which means
      // that the user will need to manually log in
      try {
        validationCode = await secureStorage.getValidationCode();
        // eslint-disable-next-line no-empty
      } catch (e) {}

      // When the app loads check if the user has an accessToken. If they do we
      // will try to launch the app with TouchID, or prompt them to enter their
      // pin, instead of getting them to hit the log in button
      if (accessToken && validationCode) {
        if (useBioAuth) {
          // Immediately hide the splash screen if we are using touchID
          SplashScreen.hide();

          try {
            // unlockWithTouchId will throw an error if the pinCode is not valid
            const { pinCode } = await secureStorage.unlockWithTouchID();

            // If the user is connected to the internet try logging them in via the api
            if (!offlineMode.isOffline) {
              await login(pinCode);
            }

            // If the API login succeeds **or** if the user has no internet connection
            // we will immediately dismiss the navigation to let the user use the app
            onboardingHelper.dismiss(navigation);
          } catch (e) {
          // The user's access token is in memory, but face ID failed. We will take
          // the user directly to the login page, where they can try to login
            navigation.push(screens.OnboardingPinLogin);
          }
        } else {
          // We don't want to animate the push animation if the user doesn't have touchID
          // This will make it so the first screen the user sees is PinLogin
          navigation.replace(screens.OnboardingPinLogin);

          // Put this in a timeout to make sure the screen is replaced before the
          // splashscreen hides
          setTimeout(() => {
            SplashScreen.hide();
          }, 0);
        }
      } else {
        SplashScreen.hide();
      }
    };

    if (!userHasBeenDirected.current) {
      checkBiometricSupport();
      directUser();
    }
  }, [imageSize]);

  const handleFocus = () => {
    clearFormData();
  };

  const handleTOSPress = () => {
    navigation.push(screens.SettingsTermsOfUse);
  };

  const handlePrivacyPress = () => {
    navigation.push(screens.SettingsPrivacyPolicy);
  };

  const handleStartPress = () => {
    trackEvent(loginEvents.CLICK_GET_STARTED);
    navigation.push(screens.OnboardingEnterPhone);
  };

  let titleProps = {
    fontSize: 48,
    lineHeight: 48,
    weight: 'medium',
  };

  let buttonSize = 'large';

  // The loading screen looks pretty bad on tiny phones if we don't adjust some sizes
  if (Dimensions.get('window').width <= 320) {
    titleProps = {
      fontSize: 32,
      lineHeight: 32,
      weight: 'medium',
    };

    buttonSize = 'medium';
  }

  const handleImageWrapperLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    const size = Math.min(width, height);
    setImageSize({ width: size, height: size });
  };

  return (
    <View style={styles.outerWrapper}>
      <BackHandler ignoreNavigationEvents />
      <View style={[onboardingStyles.content, styles.content]}>
        <NavigationEvents onWillFocus={handleFocus} />
        <Image source={logo} style={styles.logo} />
        <Text
          testID="welcome-message"
          {...titleProps}
        >
          Your hub for
          {'\n'}
          health records.
        </Text>
        <View
          style={styles.imageWrapper}
          onLayout={handleImageWrapperLayout}
        >
          <Image
            source={onboarding}
            style={[styles.background, imageSize]}
            testID="logo"
          />
        </View>
        <View style={styles.button}>
          <Button
            size={buttonSize}
            text="Get Started"
            testID="get-started-button"
            onPress={handleStartPress}
          />
        </View>
      </View>

      <View style={styles.tou}>
        <Text.Label style={styles.touText} color="medium">
          By continuing you agree to Huddle&apos;s
          {'\n'}
          <Text.Plain style={styles.link} onPress={handleTOSPress}>
            Terms of Use
          </Text.Plain>
          {' '}
          and
          {' '}
          <Text.Plain style={styles.link} onPress={handlePrivacyPress}>
            Privacy Policy
          </Text.Plain>
        </Text.Label>
      </View>
    </View>
  );
};

Onboarding.navigationOptions = {
  header: null,
};

export default connect(
  selectors.onboardingSelector,
  {
    checkBiometricSupport: biometricAuthActions.checkBiometricSupport,
    trackEvent: mixpanelActions.trackEvent,
    clearFormData: actions.clearFormData,
    login: actions.login,
  },
)(Onboarding);
