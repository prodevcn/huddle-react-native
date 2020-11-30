import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '/api';
import screens from '/screen';
import globalStyles from '/styles';
import Alert from '/overlay/Alert';
import { actions, selectors } from '/state/items';
import { actions as overlayActions } from '/state/overlays';
import BottomSheet, { BottomSheetRow } from '/component/BottomSheet';
import ConfirmDialog from '/overlay/ConfirmDialog';
import * as confirmDeleteItemEvents from '/constants/events/Items/confirmDeleteItem';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { Line } from '/overlay/ActionSheet';

const ItemMore = ({ navigation, animation }) => {
  const dispatch = useDispatch();

  const itemId = navigation.getParam('itemId');
  const item = useSelector(selectors.itemsHashSelector)[itemId];
  const { folderUniqueName } = item;

  const handleEditPress = () => {
    dispatch(overlayActions.dismiss());
    navigation.push(screens.EditItem, { itemId });
  };

  const handleSharePress = () => {
    dispatch(overlayActions.dismiss());
    navigation.push(screens.ManageSharing, { folderUniqueName });
  };

  const deleteItem = async () => {
    dispatch(trackEvent(confirmDeleteItemEvents.CLICK_DELETE));

    try {
      dispatch(overlayActions.dismiss());
      dispatch(actions.removeItem(itemId));
      // We need to call this pop in two places otherwise it would pop the Alert
      // but we need it to pop this bottom sheet
      navigation.pop();
      Alert.success(api.userMessages.itemDelete.success);
    } catch (e) {
      // todo toadums what other error codes are there here
      dispatch(overlayActions.dismiss());
      if (e.status === api.errorCodes.NOT_FOUND) {
        Alert.error(api.userMessages.itemDelete.notFound);
      } else {
        Alert.error(api.userMessages.itemDelete.failed);
      }
    }
  };

  const handleDeletePress = () => {
    dispatch(trackEvent(confirmDeleteItemEvents.VIEW));

    dispatch(overlayActions.show(ConfirmDialog, {
      title: api.userMessages.itemDelete.confirm.title,
      description: api.userMessages.itemDelete.confirm.description,
      confirmButtonTitle: 'Delete',
      onPress: deleteItem,
    }));
  };

  return (
    <BottomSheet animation={animation}>
      <BottomSheetRow
        icon="edit-line"
        label="Edit"
        onPress={handleEditPress}
        isFirst
      />
      <BottomSheetRow
        onPress={handleSharePress}
        icon="share"
        label="Manage Sharing"
      />
      <Line />
      <BottomSheetRow
        onPress={handleDeletePress}
        icon="delete"
        label="Delete Item"
        iconColor={globalStyles.palette.orange}
      />
    </BottomSheet>
  );
};

export default ItemMore;
