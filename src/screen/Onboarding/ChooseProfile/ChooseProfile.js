import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import DarkModalHeader from '/navigation/header/DarkModalHeader';
import Text from '/component/Text';
import ProfileItem from './ProfileItem';
import CreateProfileButton from '/screen/Profiles/CreateProfileButton';
import { actions as profilesActions } from '/state/profiles';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as events from '/constants/events/Onboarding/onboardingCompleted';
import onboardingStyles from '/screen/Onboarding/Onboarding.styles';
import styles from './ChooseProfile.styles';
import selector from './ChooseProfile.selector';
import onboardingHelper from '/util/onboardingHelper';

import { UseLightStatusBar } from '/util/statusBar';

import screens from '/screen';

const ChooseProfile = ({
  navigation,
  setActiveProfile,
  trackEvent,
  profiles,
  masterProfile,
}) => {
  const subtitle = profiles.length === 1
    ? 'Let\'s get started'
    : 'Which profile would you like to view?';

  const handleProfilePress = (profile) => () => {
    setActiveProfile(profile.profileCode);

    if (profile.profileCode === masterProfile.profileCode) {
      trackEvent(events.CLICK_SELF);
    } else {
      trackEvent(events.CLICK_OTHER);
    }

    onboardingHelper.dismiss(navigation);
  };

  const handleCreateProfilePress = () => {
    navigation.push(screens.CreateNewProfileStack);
  };

  return (
    <View
      style={[onboardingStyles.content, styles.wrapper]}
      testID="choose-profile-form"
    >
      <UseLightStatusBar />
      <DarkModalHeader hideIcon />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text.H2 color="white">
          Welcome to Huddle, {masterProfile.firstName}.
        </Text.H2>

        <Text.H4 style={styles.subtitle} color="white">
          {subtitle}
        </Text.H4>

        {profiles.map((profile) => (
          <ProfileItem
            profile={profile}
            key={profile.profileCode}
            style={styles.profileItem}
            onPress={handleProfilePress(profile)}
          />
        ))}
        <CreateProfileButton onPress={handleCreateProfilePress} />
      </ScrollView>
    </View>
  );
};

ChooseProfile.navigationOptions = {
  header: null,
};

export default connect(
  selector,
  {
    setActiveProfile: profilesActions.setActiveProfile,
    trackEvent: mixpanelActions.trackEvent,
  },
)(ChooseProfile);
