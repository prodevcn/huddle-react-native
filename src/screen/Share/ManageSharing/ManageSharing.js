import keys from 'lodash/keys';
import values from 'lodash/values';
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '/overlay/Alert';
import HeaderButton from '/navigation/header/HeaderButton';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import Button from '/component/Button';
import EmptyList from '/partial/EmptyList';
import ListItem from '/component/ListItem';

import api from '/api';
import { selectors as profileSelectors } from '/state/profiles';
import { actions, selectors as shareSelectors } from '/state/share';
import screens from '/screen';
import { sort } from '/util';

import styles from './ManageSharing.styles';

const alertError = () => {
  Alert.error(api.userMessages.sharingUnshare.error);
};

const alertSuccess = () => {
  Alert.success(api.userMessages.sharingUnshare.success);
};

const ManageSharing = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState({});
  const folderUniqueName = navigation.getParam('folderUniqueName');
  const linkData = sort.manageSharing(useSelector(shareSelectors.allLinkDataSelector));
  const profileCode = useSelector(profileSelectors.currentProfileCodeSelector);

  // HTTP Request
  const loadLinkData = async () => {
    await dispatch(actions.fetchLinkData(folderUniqueName));
    setLoading(false);
  };

  useEffect(() => {
    loadLinkData();
  }, []);

  const checkLink = (selectedLink) => (selected) => {
    setChecked({
      ...checked,
      [selectedLink.shareId]: selected,
    });
  };

  const handleLinkDetails = (shareItem) => navigation.push(screens.SharedLinkActivity, {
    folderUniqueName,
    created: shareItem.created, // for navigationOptions
    shareId: shareItem.shareId,
  });

  const disableSharedLinks = async () => {
    try {
      const unshareItem = (shareId) => api.sharing.unshare({ shareId }, profileCode);
      const promises = keys(checked).map(unshareItem);

      await Promise.all(promises);

      setChecked({});
      dispatch(actions.disableLinks(keys(checked)));
      alertSuccess();
    } catch (error) {
      if (error.status === api.errorCodes.NOT_FOUND) {
        alertSuccess();
        return;
      }

      alertError();
    }
  };

  const DisableButton = (
    <Button
      size="large"
      text="Disable sharing"
      onPress={disableSharedLinks}
      disabled={!values(checked).find((isChecked) => isChecked)}
    />
  );

  return (
    <BottomButtonLayout
      ScrollComponent={FlatList}
      control={DisableButton}
      data={linkData}
      keyExtractor={({ shareId }) => shareId}
      onRefresh={loadLinkData}
      refreshing={loading}
      extraData={checked}
      ListEmptyComponent={!loading && (
        <EmptyList>
          Once you share insurance, medication or other items
          the shared item links will appear here.
        </EmptyList>
      )}
      renderItem={({ item: shareItem }) => {
        const handleCheckChange = checkLink(shareItem);
        const linkDisabled = shareItem.deleted !== null;
        const shareLink = api.config.huddleWebShareUrl(shareItem.shareId);
        const description = linkDisabled ? `Disabled on ${shareItem.deleted}` : shareLink;

        return (
          <ListItem
            icon="link"
            label={`Link created ${shareItem.created}`}
            description={description}
            selected={checked[shareItem.shareId] || false}
            checkboxStyle={styles.checkbox}
            hideCheckbox={linkDisabled}
            onCheckChange={handleCheckChange}
            onPress={() => handleLinkDetails(shareItem)}
          />
        );
      }}
    />
  );
};

ManageSharing.navigationOptions = ({ navigation }) => ({
  title: 'Manage Sharing',
  headerLeft: () => {
    const dismiss = navigation.getParam('dismissOnBack');
    const action = dismiss ? navigation.dismiss : navigation.pop;

    return <HeaderButton icon="back" onPress={() => action()} />;
  },
});

export default ManageSharing;
