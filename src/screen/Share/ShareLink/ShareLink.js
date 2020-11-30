import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import Alert from '/overlay/Alert';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import Button from '/component/Button';
import ToggleSecure from '/component/Share/ToggleSecure';
import HeaderButton from '/navigation/header/HeaderButton';
import { NavigationInteractions } from '/util/interactionManager';
import TutorialAnchor from '/component/TutorialAnchor';
import * as events from '/constants/events/ShareHealthSummary/shareLink';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import ItemCard from '/partial/card/ItemCard';
import FolderCard from '/partial/card/FolderCard';

import api from '/api';
import handleShareAction from '/component/Share/ShareSheet/handler';
import { selectors } from '/state/items';
import { selectors as folderSelectors } from '/state/folders';
import { selectors as profileSelectors } from '/state/profiles';
import styles from './ShareLink.styles';
import { ANCHORS } from '/tutorial/constants';

const ShareLink = ({ navigation }) => {
  const [secure, setSecure] = useState(true);
  const dispatch = useDispatch();

  const itemId = navigation.getParam('itemId');
  const folderUniqueName = navigation.getParam('folderUniqueName');
  const items = useSelector(selectors.itemsHashSelector, shallowEqual);
  const folder = useSelector(folderSelectors.allFoldersSelector, shallowEqual)[folderUniqueName];
  const item = items[itemId];
  const profileCode = useSelector(profileSelectors.currentProfileCodeSelector);

  const getPreview = () => {
    if (folder) {
      return (
        <FolderCard
          items={items}
          folder={folder}
          style={styles.card}
        />
      );
    }

    return (
      <ItemCard
        item={item}
        style={styles.card}
      />
    );
  };

  const handleToggleSecure = (value) => {
    if (value) {
      dispatch(trackEvent(events.CLICK_REQUIRE_INFO));
    } else {
      dispatch(trackEvent(events.CLICK_DO_NOT_REQUIRE_INFO));
    }

    setSecure(value);
  };

  const handleShareLinkPress = async () => {
    dispatch(trackEvent(events.CLICK_SHARE));

    const folderId = folder ? folder.folderUniqueName : item.folderUniqueName;

    try {
      const { shareUniqueName } = await api.sharing.share({
        folderUniqueName: folderId,
        secure,
      }, profileCode);

      const secureLink = api.config.huddleWebShareUrl(shareUniqueName);

      await handleShareAction(secureLink);
    } catch (error) {
      if (error.status === api.errorCodes.INVALID_PERMISSIONS) {
        Alert.error(api.userMessages.sharingShare.errorOwnership);
        return;
      }

      Alert.error(api.userMessages.sharingShare.error);
    }
  };

  const button = (
    <TutorialAnchor name={ANCHORS.ShareLinkButton}>
      <Button
        size="large"
        onPress={handleShareLinkPress}
        text="Share link"
      />
    </TutorialAnchor>
  );


  return (
    <BottomButtonLayout control={button}>
      <NavigationInteractions />
      {getPreview()}

      <TutorialAnchor>
        <ToggleSecure
          selected={secure}
          style={{ wrapper: styles.itemBottom }}
          onToggle={handleToggleSecure}
        />
      </TutorialAnchor>
    </BottomButtonLayout>
  );
};

ShareLink.navigationOptions = ({ navigation }) => ({
  title: 'Share a link',
  headerLeft: () => <HeaderButton icon="back" onPress={() => navigation.dismiss()} />,
});

export default ShareLink;
