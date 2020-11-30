import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '/overlay/Alert';
import ConfirmDialog from '/overlay/ConfirmDialog';

import api from '/api';
import { selectors as profileSelectors } from '/state/profiles';
import { actions } from '/state/share';

// We could just use the DeletItem overlay directly instead of wrapping it in
// this DisableLink, but the logic here is complex enough that  think we should
// create a custom DisableLink component
const DisableLink = ({ shareId, animation }) => {
  const dispatch = useDispatch();
  const profileCode = useSelector(profileSelectors.currentProfileCodeSelector);

  const alertSuccess = () => {
    Alert.success(api.userMessages.sharingUnshare.success);
  };

  const alertError = (message) => {
    Alert.error(message);
  };

  const disableSharedLink = async () => {
    try {
      await api.sharing.unshare({ shareId }, profileCode);

      dispatch(actions.disableLinks([shareId]));
      alertSuccess();
    } catch (error) {
      const linkPreviouslyDisabled = error.status === api.errorCodes.NOT_FOUND;
      const notOwnerOfLink = error.status === api.errorCodes.INVALID_PERMISSIONS;

      if (linkPreviouslyDisabled) {
        alertSuccess();
        return;
      }

      if (notOwnerOfLink) {
        alertError(api.userMessages.sharingShare.errorOwnership);
        return;
      }

      alertError(api.userMessages.sharingUnshare.error);
    }
  };

  const description = 'Once disabled, anyone who had access to this link will no longer be able to access any health items through it.';

  return (
    <ConfirmDialog
      title="Are you sure you want to disable this secure link?"
      description={description}
      confirmButtonTitle="Disable"
      onPress={disableSharedLink}
      animation={animation}
    />
  );
};

export default DisableLink;
