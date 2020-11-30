import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import globalStyles from '/styles';
import DetailedIcon from '/component/DetailedIcon';
import Icon from '/component/Icon';
import Text from '/component/Text';
import TextArea from '/overlay/ModalTextArea';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { actions as overlayActions } from '/state/overlays';
import * as events from '/constants/events/SettingsAndHelp/submitTicket';
import * as textAreaEvents from '/constants/events/SettingsAndHelp/describeIssue';
import styles from './IssueForm.styles';

const IssueForm = ({ formProps }) => {
  const dispatch = useDispatch();
  const { values, handleChange } = formProps;

  const handleIssueChange = (value) => {
    dispatch(trackEvent(textAreaEvents.CLICK_CONTINUE));
    handleChange('issue')(value.value);
  };

  const handleIssuePress = () => {
    dispatch(trackEvent(events.CLICK_DESCRIBE_ISSUE));
    dispatch(overlayActions.show(TextArea, {
      onSubmit: handleIssueChange,
      value: values.issue,
    }));
  };

  const LargeIcon = values.issue ? DetailedIcon.NoteCustom : DetailedIcon.NoteCreate;
  const title = values.issue ? 'Your issue' : 'Please describe your issue…';
  const smallIcon = values.issue ? 'eye' : 'plus';
  const subtitle = values.issue ? 'Edit' : 'Add';

  return (
    <>
      <TouchableOpacity onPress={handleIssuePress} style={styles.issueButton}>
        <LargeIcon />

        {!!values.issue && <Text.H3 style={styles.issueTitle}>{title}</Text.H3>}
        {!values.issue && (
          <Text color="medium" style={styles.issueTitle}>
            {title}
          </Text>
        )}

        <Icon name={smallIcon} size={16} color={globalStyles.palette.teal} />
        <Text.Label style={styles.issueSubtitle}>{subtitle}</Text.Label>
      </TouchableOpacity>

      {!!values.issue && (
        <>
          <Text style={styles.preview}>{values.issue}</Text>
          <View style={styles.previewBorder} />
        </>
      )}
    </>
  );
};

export default IssueForm;
