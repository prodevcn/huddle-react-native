import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '/styles';
import Text from '/component/Text';
import Icon from '/component/Icon';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import FullScreenSpinner from '/partial/FullScreenSpinner';
import * as events from '/constants/events/InvitingToCareTeam/ConfirmInvite';
import { actions as mixpanelActions } from '/state/mixpanel';
import { actions as careTeamActions } from '/state/careTeam';
import Button from '/component/Button';
import useDeterminer from '/hook/useDeterminer';
import { EMAIL_REGEXP } from '/util/validations';
import styles from './CareTeamConfirm.styles';
import Alert from '/overlay/Alert';
import api from '/api';
import { format } from '/util';

const CareTeamConfirm = ({
  addToCareTeam,
  fetchCareTeamList,
  trackEvent,
  navigation,
}) => {
  const [viewOnlyMode, setViewOnlyMode] = useState(true);
  const [visibleSpinner, setVisibleSpinner] = useState(false);
  const [successSpinner, setSuccessSpinner] = useState(false);
  const determiner = useDeterminer();

  const contact = navigation.getParam('contact');

  const handleViewOnlyToggle = (value) => () => {
    setViewOnlyMode(value);

    if (value) {
      trackEvent(events.CLICK_VIEW_ONLY);
    } else {
      trackEvent(events.CLICK_VIEW_AND_EDIT);
    }
  };

  const handleInvite = async () => {
    setVisibleSpinner(true);
    trackEvent(events.CLICK_SEND_INVITE);

    const payload = { editable: !viewOnlyMode };

    if (EMAIL_REGEXP.test(contact)) {
      payload.email = contact;
    } else {
      payload.mobile = format.getLineNumber(format.phone(contact));
    }

    try {
      await addToCareTeam(payload);
      await fetchCareTeamList();

      setSuccessSpinner(true);

      setTimeout(() => {
        setVisibleSpinner(false);
        navigation.popToTop();
      }, 750);
    } catch (e) {
      setVisibleSpinner(false);
      const invalidPhone = e.status === api.errorCodes.INVALID_PHONE;
      const cantInviteYourself = e.status === api.errorCodes.CANT_INVITE_YOURSELF;

      if (invalidPhone) {
        Alert.error(api.userMessages.careTeamInvite.invalidPhone);
      } else if (cantInviteYourself) {
        const type = payload.email ? 'email' : 'phone number';
        Alert.error(api.userMessages.careTeamInvite.cantInviteYourself(type));
      } else {
        Alert.showGenericError();
      }
    }
  };

  return (
    <>
      <BottomButtonLayout
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        control={(
          <Button
            type="primary"
            size="large"
            onPress={handleInvite}
            text="Send Invite"
          />
        )}
      >
        <View style={styles.headerBlock}>
          <Text.H4 style={styles.headerText}>
            Are you sure you want to invite
            {'\n'}
            {contact}
            ?
          </Text.H4>
        </View>

        <Text.H4 style={styles.sectionTitle}>Access</Text.H4>

        <View style={styles.buttonsBlock}>
          <Button
            text="View Only"
            style={styles.viewOnlyButton}
            type={viewOnlyMode ? 'primary' : 'ghost'}
            onPress={handleViewOnlyToggle(true)}
          />
          <Button
            text="View & Edit"
            style={styles.viewAndExitButton}
            type={!viewOnlyMode ? 'primary' : 'ghost'}
            onPress={handleViewOnlyToggle(false)}
          />
        </View>

        {!!viewOnlyMode && (
          <Text>
            {`${contact} `}
            can only view
            {` ${determiner} `}
            profile. They will have full access to all items in
            {` ${determiner} `}
            health library. They cannot add, edit or share any items.
          </Text>
        )}

        {!viewOnlyMode && (
          <Text>
            {`${contact} `}
            will have full access to
            {` ${determiner} `}
            health items, and has the ability to add, edit,
            share, or delete any items.
          </Text>
        )}
      </BottomButtonLayout>
      <FullScreenSpinner visible={visibleSpinner} success={successSpinner} />
    </>
  );
};

CareTeamConfirm.navigationOptions = {
  headerTitle: (
    <View style={styles.iconBlock}>
      <Icon name="mail" size={22} color={globalStyles.palette.white} />
    </View>
  ),
};

export default connect(
  null,
  {
    addToCareTeam: careTeamActions.addToCareTeam,
    fetchCareTeamList: careTeamActions.fetchCareTeamList,
    trackEvent: mixpanelActions.trackEvent,
  },
)(CareTeamConfirm);
