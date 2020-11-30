import React, { useRef, useEffect, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SearchHeader from '/navigation/header/SearchHeader';
import ItemList from '/partial/ItemList';
import useAnimation from '/hook/useAnimation';
import Text from '/component/Text';
import DashboardCard from '/component/DashboardCard';
import TutorialAnchor from '/component/TutorialAnchor';
import ItemPreview from './ItemPreview';

import screens from '/screen';
import { selectors } from '/state/profiles';
import { selectors as itemsSelectors } from '/state/items';
import { selectors as offlineModeSelectors } from '/state/offlineMode';
import { selectors as tutorialsSelectors, actions as tutorialActions } from '/state/tutorial';
import { selectors as onboardingSelectors } from '/state/onboarding';
import { actions as surveyActions } from '/state/surveys';
import * as events from '/constants/events/ProfileDashboard/homeScreen';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import useDeepLink from '/hook/useDeepLink';

import { setBarStyle } from '/util/statusBar';

import shareTutorial from '/tutorial/share';
import careGiverTutorial from '/tutorial/careGiver';
import welcomeToHuddle from '/tutorial/welcomeToHuddle';
import {
  ANCHORS,
  STATES,
  TUTORIALS,
  FEEDBACK_SURVEY_HASH,
} from '/tutorial/constants';

import globalStyles from '/styles';
import useDeterminer from '/hook/useDeterminer';
import styles from './Home.styles';

const Home = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollTop, setScrollTop] = useState(-1);
  const {
    animation: itemsVisible,
    toStart: hideItems,
    toEnd: showItems,
  } = useAnimation({ duration: 100 });

  // This ref will ensure we only ever show the welcome tutorial once
  const welcomeTutorialRef = useRef(null);

  const activeProfile = useSelector(selectors.activeProfileSelector);
  const items = useSelector(itemsSelectors.itemsSelector) || [];
  const unreadTutorials = useSelector(tutorialsSelectors.unreadSelector);
  const insuranceItems = useSelector(itemsSelectors.insuranceItems);
  const isMaster = useSelector(selectors.activeProfileIsMasterSelector);
  const sharedProfile = useSelector(selectors.sharedProfileSelector);
  const showWelcomeTutorial = useSelector(onboardingSelectors.showWelcomeTutorialSelector);
  const isOnline = !useSelector(offlineModeSelectors.isOffline);
  const readOnly = useSelector(selectors.readOnlyActiveProfileSelector);

  const dispatch = useDispatch();
  const determiner = useDeterminer(true);

  useDeepLink(navigation);

  // After the health summary card tutorial anchor is laid out, check to see if
  // the user is a new account, and if they are highlight the card after a delay
  // Note: The delay of 350ms is a kind of magic number. It looks nice and is
  // the duration of navigation animations
  const handleHealthSummaryCardLayout = () => {
    if (showWelcomeTutorial && !welcomeTutorialRef.current) {
      welcomeTutorialRef.current = true;
      setTimeout(() => {
        welcomeToHuddle();
      }, 350);
    }
  };

  useEffect(() => {
    dispatch(tutorialActions.getUnread());
    setBarStyle('dark-content');
  }, []);

  if (!activeProfile) {
    return null;
  }

  const handleProfilesPress = () => {
    navigation.push(screens.ProfilesStack);
  };

  const handleHealthSummaryPress = () => {
    navigation.push(screens.HealthStack);
  };

  const handleSharePress = () => {
    dispatch(trackEvent(events.CLICK_LEARN_ABOUT_SECURE_SHARING));
    shareTutorial(navigation);
  };

  const handleCarePress = () => {
    dispatch(trackEvent(events.CLICK_SHARE_PROFILE_WITH_CAREGIVER));
    careGiverTutorial();
  };

  const handleDismiss = (tutorial) => () => {
    if (tutorial === TUTORIALS.share) {
      dispatch(trackEvent(events.CLICK_IGNORE_LEARN_ABOUT_SECURE_SHARING));
    }

    if (tutorial === TUTORIALS.careGiver) {
      dispatch(trackEvent(events.CLICK_IGNORE_SHARE_PROFILE_WITH_CAREGIVER));
    }

    if (tutorial === TUTORIALS.scanInsuranceCard) {
      dispatch(trackEvent(events.CLICK_IGNORE_SCAN_YOUR_INSURANCE_CARD));
    }

    if (tutorial === TUTORIALS.survey) {
      dispatch(trackEvent(events.CLICK_IGNORE_TAKE_SURVEY));
    }

    dispatch(tutorialActions.changeUnread(tutorial, STATES.dismissed));
  };

  const handleScrollLayout = (e) => {
    const top = e.nativeEvent.layout.y;
    if (top !== scrollTop) {
      setScrollTop(top);
    }
  };

  const handleReviewMedsPress = () => {
    navigation.push(screens.ReviewMedicationStack);
  };

  const handleSurveyPress = () => {
    dispatch(trackEvent(events.CLICK_TAKE_SURVEY));
    dispatch(surveyActions.setSurvey(FEEDBACK_SURVEY_HASH, handleDismiss(TUTORIALS.survey)));
  };

  const handleScanInsurancePress = () => {
    dispatch(trackEvent(events.CLICK_SCAN_YOUR_INSURANCE_CARD));
    navigation.push(screens.ScanInsuranceCardStack, { firstStackScreen: true });
  };

  // When the search term changes show filtered items if there is a term,
  // otherwise hide the items
  const handleSearchChange = (value) => {
    if (value) {
      showItems();
    } else {
      hideItems();
    }

    setSearchTerm(value);
  };

  const itemListWrapperStyles = [
    styles.itemListWrapper,
    {
      opacity: itemsVisible,
      top: scrollTop,
      transform: [{
        scale: itemsVisible.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      }],
    },
  ];

  const healthSummary = (
    <DashboardCard
      onPress={handleHealthSummaryPress}
      title={`${determiner} Health Summary`}
      color={globalStyles.palette.coral}
      hideClose
    />
  );

  const name = isMaster ? 'you' : activeProfile.firstName;

  const reviewMeds = (
    <DashboardCard
      onPress={handleReviewMedsPress}
      title={`Review the medications we imported for ${name}`}
      color={globalStyles.palette.coral}
      subtitle="Getting started"
      onClose={handleDismiss(TUTORIALS.reviewMedication)}
      closeWithoutAnimation
    />
  );

  let primaryCard = healthSummary;

  const profileFromLink = activeProfile.custom.signupSource === 'LINK';

  if (profileFromLink && unreadTutorials.reviewMedication) {
    primaryCard = reviewMeds;
  }

  return (
    <View style={styles.wrapper}>
      <SearchHeader
        value={searchTerm}
        onChangeText={handleSearchChange}
        profile={activeProfile}
        onAvatarPress={handleProfilesPress}
        placeholder={`Search ${activeProfile.firstName}'s Items`}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
        onLayout={handleScrollLayout}
      >
        <Text.H1 style={styles.title}>
          {activeProfile.firstName}
          {' '}
          {activeProfile.lastName}
        </Text.H1>

        <ScrollView
          horizontal
          contentContainerStyle={styles.cardScrollView}
          showsHorizontalScrollIndicator={false}
        >
          <TutorialAnchor name={ANCHORS.WELCOME_CARD} onLayout={handleHealthSummaryCardLayout}>
            {primaryCard}
          </TutorialAnchor>

          {!readOnly && isOnline && !!unreadTutorials.scanInsuranceCard && !insuranceItems.length
            && (
              <DashboardCard
                subtitle="Getting started"
                onPress={handleScanInsurancePress}
                title="Scan your insurance card"
                color={globalStyles.palette.purple}
                onClose={handleDismiss(TUTORIALS.scanInsuranceCard)}
                showMarginLeft
              />
            )}

          {isOnline && !!unreadTutorials.survey && (
            <DashboardCard
              onPress={handleSurveyPress}
              title="Help make Huddle better"
              color={globalStyles.palette.teal}
              onClose={handleDismiss(TUTORIALS.survey)}
              showMarginLeft
            />
          )}

          {!readOnly && !sharedProfile && isOnline && !!unreadTutorials.careGiver && (
            <DashboardCard
              onPress={handleCarePress}
              title="Share a profile with a caregiver"
              color={globalStyles.palette.purple}
              onClose={handleDismiss(TUTORIALS.careGiver)}
              showMarginLeft
            />
          )}

          {!readOnly && isOnline && !!items.length && unreadTutorials.share && (
            <DashboardCard
              onPress={handleSharePress}
              title="Learn about secure sharing"
              color={globalStyles.palette.purple}
              onClose={handleDismiss(TUTORIALS.share)}
              showMarginLeft
            />
          )}
        </ScrollView>
        <ItemPreview
          navigation={navigation}
          determiner={determiner}
          items={items.slice(0, 3)}
        />
      </ScrollView>
      <Animated.View style={itemListWrapperStyles} pointerEvents={searchTerm ? 'auto' : 'none'}>
        <ItemList navigation={navigation} searchTerm={searchTerm} />
      </Animated.View>
    </View>
  );
};

Home.navigationOptions = {
  header: null,
};

export default Home;
