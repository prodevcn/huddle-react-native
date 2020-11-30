import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '/component/Button';
import Text from '/component/Text';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { handleInviteSomeone } from '/component/Share/ShareSheet/handler';
import * as events from '/constants/events/SettingsAndHelp/inviteSomeone';

import styles from './InviteSomeone.styles';

const InviteSomeone = () => {
  const dispatch = useDispatch();

  const handlePress = () => {
    const message = 'Thought this might be useful for you!\n\nI\'ve been using Huddle to manage medical information.\n\nYou can check out the app here: https://www.huddle-health.com/';
    dispatch(trackEvent(events.CLICK_SEND_INVITE));
    handleInviteSomeone(message);
  };

  const controls = (
    <Button
      text="Send invite"
      onPress={handlePress}
    />
  );

  return (
    <BottomButtonLayout
      control={controls}
      contentContainerStyle={styles.container}
    >
      <Text.H1>Invite someone to{'\n'}Huddle</Text.H1>
      <Text style={styles.text}>Know someone who would like to get early access to Huddle?</Text>
      <Text>Tap the button below to send them an invite.</Text>
    </BottomButtonLayout>
  );
};

export default InviteSomeone;
