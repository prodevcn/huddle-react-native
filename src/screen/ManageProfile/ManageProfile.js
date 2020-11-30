import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { object } from 'yup';
import profileTypes from '/constants/profileTypes';

import api from '/api';
import screens from '/screen';
import { validations, format } from '/util';
import Text from '/component/Text';
import Button from '/component/Button';
import HeaderButton from '/navigation/header/HeaderButton';
import { actions as profilesActions } from '/state/profiles';
import { actions as mixpanelActions } from '/state/mixpanel';
import { actions as careTeamActions } from '/state/careTeam';
import { actions as overlayActions } from '/state/overlays';
import * as events from '/constants/events/ManageProfiles/manageProfile';
import TutorialAnchor from '/component/TutorialAnchor';
import Alert from '/overlay/Alert';
import ConfirmDialog from '/overlay/ConfirmDialog';

import AvatarBlock from './AvatarBlock';
import CareTeam from './CareTeam';
import DeleteProfile from './DeleteProfile';
import UserInfoForm from './UserInfoForm';
import selector from './ManageProfile.selector';

import { REQUIRED_LABEL } from '/constants/config';
import styles from './ManageProfile.styles';
import { NavigationInteractions } from '/util/interactionManager';

const validationSchema = object().shape({
  firstName: validations.string.required(REQUIRED_LABEL),
  lastName: validations.string.required(REQUIRED_LABEL),
  dob: validations.date.required(REQUIRED_LABEL),
});

const ManageProfile = ({
  navigation,
  activeProfile,
  isMasterProfile,
  deleteProfile,
  setActiveProfile,
  updateProfile,
  masterProfileCode,
  trackEvent,
  fetchCareTeamList,
  isTutorialActive,
  showOverlay,
}) => {
  useEffect(() => {
    const fetchList = async () => {
      await fetchCareTeamList();
    };

    fetchList();
  }, []);

  const { profileCode, profileType } = activeProfile;
  const handleSubmit = async (values, actions) => {
    const { firstName, lastName, dob } = values;

    const data = {
      firstName,
      lastName,
      dob: format.appDateToAPIDate(dob),
    };

    try {
      await updateProfile({ profileCode, data });
      actions.setSubmitting(false);

      Alert.success(api.userMessages.updateProfile.success);
    } catch (e) {
      // todo toadums What errors are possible here?
      Alert.showGenericError();
    }
  };

  const handleAvatarChange = async (avatar) => {
    try {
      await updateProfile({ profileCode, data: { avatar } });
      Alert.success(api.userMessages.avatar.uploadSuccess);
    } catch (e) {
      if (e.status === api.errorCodes.NOT_IN_CARETEAM) {
        Alert.error(api.userMessages.updateProfile.notInCareTeam);
      } else {
        Alert.error(api.userMessages.avatar.uploadError);
      }
    }
  };

  const handleDeletePress = () => {
    deleteProfile(profileCode);
    setActiveProfile(masterProfileCode);
    navigation.pop();
  };

  const handleDeleteProfile = () => {
    trackEvent(events.CLICK_DELETE);

    showOverlay(ConfirmDialog, {
      title: `Are you sure you want to delete ${activeProfile.firstName}’s profile?`,
      description: `Once deleted, ${activeProfile.firstName}’s profile and health items cannot be recovered and all shared access will be revoked.`,
      confirmButtonTitle: 'Delete',
      successMessage: api.userMessages.deleteProfile.success,
      errorMessage: api.userMessages.deleteProfile.error,
      onPress: handleDeletePress,
    });
  };

  const handleInvite = () => {
    trackEvent(events.CLICK_INVITE_CARE_TEAM);
    navigation.push(screens.CareTeamContacts);
  };

  const title = isMasterProfile ? 'Manage your profile' : 'Manage profile';
  const titleForCareTeam = isMasterProfile ? 'Your Care Team' : 'Care Team';
  const showDeleteButton = !isMasterProfile && profileType === profileTypes.Normal;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="always"
      ref={(ref) => {
        // If we are in a tutorial, scroll to the bottom of the scrollview
        // to ensure the control is valid. It's a bit hacky, but /shrug
        if (!isTutorialActive) return;
        // Put it in a timeout to make sure it works on Android.
        setTimeout(() => {
          if (ref) {
            ref.scrollToEnd();
          }
        }, 0);
      }}
    >
      <NavigationInteractions />
      <Text.H2>{title}</Text.H2>

      <Formik
        enableReinitialize
        initialValues={activeProfile}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        {(formProps) => (
          <>
            <AvatarBlock
              navigation={navigation}
              profile={activeProfile}
              onChange={handleAvatarChange}
            />

            <UserInfoForm formProps={formProps} />

            <Button
              text="Save"
              size="small"
              disabled={!formProps.dirty || !formProps.isValid}
              loading={formProps.isSubmitting}
              style={styles.smallButtons}
              onPress={formProps.handleSubmit}
            />

            <Text.H4 style={styles.sectionTitle}>{titleForCareTeam}</Text.H4>

            <CareTeam navigation={navigation} />

            <TutorialAnchor style={styles.smallButtons}>
              <Button text="Invite" size="small" onPress={handleInvite} />
            </TutorialAnchor>

            {showDeleteButton && (
              <>
                <Text.H4 style={styles.sectionTitle}>
                  {`Delete ${activeProfile.firstName}’s Profile`}
                </Text.H4>
                <DeleteProfile firstName={activeProfile.firstName} />
                <Button
                  text="Delete Profile"
                  size="small"
                  style={styles.smallButtons}
                  onPress={handleDeleteProfile}
                />
              </>
            )}
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

ManageProfile.navigationOptions = ({ navigation }) => ({
  headerLeft: <HeaderButton icon="back" onPress={() => navigation.goBack(null)} />,
});

export default connect(
  selector,
  {
    deleteProfile: profilesActions.deleteProfile,
    setActiveProfile: profilesActions.setActiveProfile,
    updateProfile: profilesActions.updateProfile,
    trackEvent: mixpanelActions.trackEvent,
    fetchCareTeamList: careTeamActions.fetchCareTeamList,
    showOverlay: overlayActions.show,
  },
)(ManageProfile);
