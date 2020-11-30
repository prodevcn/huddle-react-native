import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { getInputSource } from '/constants/config';

import Icon from '/component/Icon';
import Text from '/component/Text';
import Button from '/component/Button';
import ListItem from '/component/ListItem';

import Alert from '/overlay/Alert';
import api from '/api';

import { actions as folderActions } from '/state/folders';
import { actions as mixpanelActions } from '/state/mixpanel';

import * as addItemEvents from '/constants/events/Folders/addItem';

import styles from './EmptyFolderItem.styles';

const EmptyFolder = ({ item, folder }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // We want to keep track of whether or not an item is already in the folder, even
  // if it is added from the `FolderAddItem` screen. If an item is added via that
  // screen it will be updated in redux which will be reflected here.
  const itemInFolder = folder.docUniqueName.indexOf(item.docUniqueName) > -1;

  const handleAdd = async () => {
    setLoading(true);
    dispatch(mixpanelActions.trackEvent(addItemEvents.CLICK_ADD_ITEM));

    try {
      await dispatch(folderActions.addItemToFolder(folder.folderUniqueName, item.docUniqueName));
    } catch (e) {
      if (e.status === api.errorCodes.FOLDER_NOT_FOUND) {
        Alert.error(api.userMessages.folder.notFound);
      } else if (e.status === api.errorCodes.FOLDER_USER_NOT_FOUND) {
        Alert.error(api.userMessages.folder.userNotFound);
      } else {
        Alert.showGenericError();
      }
    }

    setLoading(false);
  };

  let addText = 'Add';

  if (itemInFolder) {
    addText = (
      <Text>Added <Icon name="checkmark" size={16} /></Text>
    );
  }

  return (
    <ListItem
      label={item.displayName}
      description={getInputSource(item.custom.inputSource)}
      hidePreview
    >
      <Button
        text={addText}
        size="small"
        type="ghost"
        style={styles.addItem}
        onPress={handleAdd}
        loading={loading}
        disabled={itemInFolder}
      />
    </ListItem>
  );
};

export default EmptyFolder;
