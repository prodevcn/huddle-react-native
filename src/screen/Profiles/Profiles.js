import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import screens from '/screen';
import Text from '/component/Text';
import DarkModalHeader from '/navigation/header/DarkModalHeader';
import { actions as profilesActions } from '/state/profiles';
import ProfileItem from './ProfileItem';
import SettingsButton from './SettingsButton';
import CreateProfileButton from './CreateProfileButton';
import { NavigationInteractions } from '/util/interactionManager';
import profileTypes from '/constants/profileTypes';

import { UseLightStatusBar } from '/util/statusBar';
import { clickHandler } from '/util/offlineMode';

import selector from './Profiles.selector';
import styles from './Profiles.styles';

const Profiles = ({
  navigation,
  masterProfile,
  otherProfiles,
  setActiveProfile,
  activeProfileCode,
}) => {
  const registerTutorialDismiss = navigation.getParam('registerTutorialDismiss');
  useEffect(() => {
    if (registerTutorialDismiss) {
      registerTutorialDismiss(() => navigation.dismiss());
    }
  }, []);

  const handleSettingsPress = () => {
    navigation.push(screens.SettingsStack);
  };

  const handleManageProfile = () => {
    navigation.push(screens.ManageProfileStack);
  };

  const handleSelectProfile = (profileCode) => () => {
    setActiveProfile(profileCode);
    navigation.pop();
  };

  const handleCreateProfilePress = () => {
    navigation.push(screens.CreateNewProfileStack);
  };

  const handleClose = () => {
    navigation.pop();
  };

  return (
    <View style={styles.wrapper}>
      <UseLightStatusBar />
      <DarkModalHeader onClose={handleClose} />
      <NavigationInteractions />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
        <View style={styles.mainContent}>
          <Text.H4 style={styles.sectionTitle}>Your Profile</Text.H4>

          {!!masterProfile && (
            <ProfileItem
              profile={masterProfile}
              active={activeProfileCode === masterProfile.profileCode}
              normalProfileType
              onManagePress={clickHandler(handleManageProfile)}
              onPress={handleSelectProfile(masterProfile.profileCode)}
            />
          )}

          <Text.H4 style={styles.sectionTitle}>Show items for</Text.H4>

          {otherProfiles.map((item) => (
            <ProfileItem
              profile={item}
              key={item.profileCode}
              active={activeProfileCode === item.profileCode}
              normalProfileType={item.profileType === profileTypes.Normal}
              onManagePress={clickHandler(handleManageProfile)}
              onPress={handleSelectProfile(item.profileCode)}
            />
          ))}

          <CreateProfileButton
            onPress={clickHandler(handleCreateProfilePress)}
          />
        </View>
      </ScrollView>
      <SettingsButton onPress={handleSettingsPress} />
    </View>
  );
};

Profiles.navigationOptions = {
  header: null,
};

export default connect(
  selector,
  {
    setActiveProfile: profilesActions.setActiveProfile,
  },
)(Profiles);
