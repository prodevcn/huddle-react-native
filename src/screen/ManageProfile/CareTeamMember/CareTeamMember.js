import React from 'react';
import { useDispatch } from 'react-redux';

import api from '/api';
import globalStyles from '/styles';
import Avatar from '/component/Avatar';
import ListItem from '/component/ListItem';
import Link from '/component/Link';
import CaregiverMore from '/overlay/CaregiverMore';
import * as events from '/constants/events/ManageProfiles/confirmRemoveFromCareTeam';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { removeFromCareTeam, fetchCareTeamList } from '/state/careTeam/careTeam.actions';
import { actions as overlayActions } from '/state/overlays';
import styles from './CareTeamMember.styles';

/**
 * INIT – initial state, invite email/sms submit first time
 * RESENT – second email/sms submit done
 * FAIL – send no-response notification to profile/album owner
 * DONE – add Huddle username as CareTeam member done
 * @typedef {('INIT'|'RESENT'|'FAIL'|'DONE')} careTeamStatusesEnum
 *
 * @param {Object} data
 * @param {String} [data.email]
 * @param {String} [data.mobile]
 * @param {careTeamStatusesEnum} data.careTeamStatus
 * @param {Boolean} data.editable
 */
const CareTeamMember = ({
  email,
  mobile,
  careTeamStatus,
  editable,
  navigation,
}) => {
  const dispatch = useDispatch();

  const contact = mobile || email;
  // TODO: (Andrew) what about the other statuses?
  let status = '';

  if (careTeamStatus === 'INIT' || careTeamStatus === 'RESENT') {
    status = '(invited)';
  }

  const handleRemovePress = () => {
    dispatch(trackEvent(events.CLICK_REMOVE));
    dispatch(removeFromCareTeam({ email, mobile }));
    dispatch(fetchCareTeamList());
  };

  const handleMorePress = () => {
    dispatch(trackEvent(events.VIEW));
    dispatch(overlayActions.show(CaregiverMore, {
      navigation,
      removeParams: {
        title: `Are you sure you want to remove ${contact} from the Care Team?`,
        description: 'Once removed, they will no longer have access to any health items.',
        confirmButtonTitle: 'Remove',
        successMessage: api.userMessages.caregiversActions.remove.success,
        errorMessage: api.userMessages.caregiversActions.remove.error,
        onPress: handleRemovePress,
      },
    }));
  };

  const title = `${contact}${status}`;
  const description = editable ? 'Can view & edit' : 'View only';

  const Preview = <Avatar profile={{ firstName: contact }} />;

  return (
    <ListItem
      icon="Location"
      style={styles.listItem}
      preview={Preview}
      label={title}
      labelEllipsizeMode="middle"
      description={description}
    >
      <Link
        icon="more"
        iconColor={globalStyles.palette.deepBlue}
        style={styles.moreIcon}
        onPress={handleMorePress}
      />
    </ListItem>
  );
};

export default CareTeamMember;
