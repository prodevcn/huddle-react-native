import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '/api';
import screens from '/screen';
import globalStyles from '/styles';
import Alert from '/overlay/Alert';
import { actions, selectors } from '/state/folders';
import { actions as overlayActions } from '/state/overlays';
import BottomSheet, { BottomSheetRow } from '/component/BottomSheet';
import ConfirmDialog from '/overlay/ConfirmDialog';
import * as confirmDeleteFolderEvents from '/constants/events/Folders/confirmDeleteFolder';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { Line } from '/overlay/ActionSheet';

const ItemMore = ({ navigation, animation }) => {
  const folderUniqueName = navigation.getParam('folderUniqueName');
  const dispatch = useDispatch();
  const favorite = useSelector(selectors.favoritesFolderSelector);

  const isFavorites = favorite && favorite.folderUniqueName === folderUniqueName;

  const handleEditPress = () => {
    dispatch(overlayActions.dismiss());
    navigation.push(screens.FolderFormStack, { folderUniqueName });
  };

  const handleRemoveItemsPress = () => {
    dispatch(overlayActions.dismiss());
    navigation.push(screens.FolderDeleteItemsStack, { folderUniqueName });
  };

  const handleSharePress = () => {
    dispatch(overlayActions.dismiss());
    navigation.push(screens.ManageSharingStack, {
      folderUniqueName,
      dismissOnBack: true,
    });
  };

  const deleteFolder = async () => {
    dispatch(trackEvent(confirmDeleteFolderEvents.CLICK_DELETE));

    try {
      dispatch(overlayActions.dismiss());
      dispatch(actions.removeFolder(folderUniqueName));

      // todo toadums use a ConfirmDialog overlay instead of a system alert
      navigation.pop();
      Alert.success(api.userMessages.folderDelete.success);
    } catch (e) {
      dispatch(overlayActions.dismiss());
      if (e.status === api.errorCodes.NOT_FOUND) {
        Alert.error(api.userMessages.folderDelete.notFound);
      } else {
        Alert.error(api.userMessages.folderDelete.failed);
      }
    }
  };

  const handleDeletePress = () => {
    dispatch(trackEvent(confirmDeleteFolderEvents.VIEW));

    dispatch(overlayActions.show(ConfirmDialog, {
      title: api.userMessages.folderDelete.confirm.title,
      description: api.userMessages.folderDelete.confirm.description,
      confirmButtonTitle: 'Delete',
      onPress: deleteFolder,
    }));
  };

  const removeItems = (
    <BottomSheetRow
      onPress={handleRemoveItemsPress}
      icon="file-minus"
      label="Remove Items from Folder"
    />
  );

  const manageSharing = (
    <BottomSheetRow
      onPress={handleSharePress}
      icon="share"
      label="Manage Sharing"
    />
  );

  // Don't let users edit/delete the favorites folder
  if (isFavorites) {
    return (
      <BottomSheet animation={animation}>
        {removeItems}
        {manageSharing}
      </BottomSheet>
    );
  }

  return (
    <BottomSheet animation={animation}>
      <BottomSheetRow
        icon="edit-line"
        label="Edit"
        onPress={handleEditPress}
        isFirst
      />
      {removeItems}
      {manageSharing}
      <Line />
      <BottomSheetRow
        onPress={handleDeletePress}
        icon="delete"
        label="Delete Folder"
        iconColor={globalStyles.palette.orange}
      />
    </BottomSheet>
  );
};

export default ItemMore;
