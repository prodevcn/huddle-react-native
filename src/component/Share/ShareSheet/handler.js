import { Share, Platform } from 'react-native';

import Alert from '/overlay/Alert';

import api from '/api';
import { store } from '/state/store';
import shareActions from '/constants/shareActions';
import * as events from '/constants/events/ShareHealthSummary/shareOptions';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';

async function handleShareAction(message) {
  const alertCancel = () => Alert.general(api.userMessages.sharingShare.cancel);
  const alertSuccess = (type) => {
    let title = api.userMessages.sharingShare.success.generic;
    if (type === shareActions.Clipboard) {
      title = api.userMessages.sharingShare.success.clipboard; // iOS only
      store.dispatch(trackEvent(events.CLICK_COPY_LINK));
      title = api.userMessages.sharingShare.success.clipboard;
    }

    Alert.success({ title });
  };

  try {
    const actionResult = await Share.share({ message });

    if (Platform.OS === 'ios') {
      if (actionResult.action === Share.sharedAction) {
        alertSuccess(actionResult.activityType);
      } else if (actionResult.action === Share.dismissedAction) {
        alertCancel();
      }
    }
  } catch (error) {
    if (error.message === shareActions.SaveFilesActionCancel) {
      alertCancel();
    }
  }
}

async function handleInviteSomeone(message) {
  const alertCancel = () => Alert.general(api.userMessages.inviteSomeone.cancel);
  const alertSuccess = () => {
    const title = api.userMessages.inviteSomeone.success.generic;
    Alert.success({ title });
  };

  try {
    const actionResult = await Share.share({ message });

    if (actionResult.action === Share.sharedAction) {
      alertSuccess();
    } else if (actionResult.action === Share.dismissedAction) {
      alertCancel();
    }
  } catch (error) {
    if (error.message === shareActions.SaveFilesActionCancel) {
      alertCancel();
    }
  }
}

export default handleShareAction;
export { handleInviteSomeone };
