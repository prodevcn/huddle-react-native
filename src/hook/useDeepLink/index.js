import { Platform, Linking } from 'react-native';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectors as profileSelectors } from '/state/profiles';
import { selectors as onboardingSelectors } from '/state/onboarding';
import { actions as overlayActions } from '/state/overlays';
import { actions as tutorialActions } from '/state/tutorial';

import surveyDeepLink from './surveyDeepLink';
import itemDeepLink from './itemDeepLink';

const SURVEY_REGEXP = /survey/;

export default (navigation) => {
  const activeProfile = useSelector(profileSelectors.activeProfileSelector);
  const onboardingDismissed = useSelector(onboardingSelectors.onboardingDismissedSelector);
  const hasProfile = useRef(null);
  const dispatch = useDispatch();

  const handleLink = (url) => {
    if (url.match(SURVEY_REGEXP)) {
      surveyDeepLink(navigation, url);
    } else {
      itemDeepLink(navigation, url);
    }

    // Dismiss overlays which would block the item form
    dispatch(overlayActions.dismiss());
    dispatch(tutorialActions.dismiss());
  };

  const handleIncomingLink = (url) => {
    if (url) {
      handleLink(url.url);
    }
  };

  useEffect(() => {
    const checkInitialLink = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        handleLink(url);
      }
    };

    // We don't want to handle deep links until a user is logged in,
    // and we don't want to handle them until *after* the onboarding
    // stack dismisses
    if (onboardingDismissed && activeProfile && !hasProfile.current) {
      hasProfile.current = true;
      // on iOS the initial app launch will call the event listener,
      // so if we call checkInitialLink we will get a double response
      if (Platform.OS === 'android') {
        checkInitialLink();
      }

      // Handle a deep link while the app is open/in the background
      Linking.addEventListener('url', handleIncomingLink);
    }

    return () => {
      Linking.removeEventListener('url', handleIncomingLink);
    };
  }, [activeProfile, onboardingDismissed]);
};
