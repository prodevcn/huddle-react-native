import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Linking, TouchableOpacity } from 'react-native';

import Alert from '/overlay/Alert';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import Button from '/component/Button';
import ListItem from '/component/ListItem';
import Text from '/component/Text';
import ToggleSecure from '/component/Share/ToggleSecure';
import DisableLink from '/overlay/DisableLink';

import api from '/api';
import handleShareAction from '/component/Share/ShareSheet/handler';
import styles from './SharedLinkActivity.style';

import { selectors as profileSelectors } from '/state/profiles';
import { actions as shareActions, selectors as shareSelectors } from '/state/share';
import { actions as overlayActions } from '/state/overlays';

const DisableButton = (handler) => (
  <Button
    key="disable"
    size="large"
    text="Disable link"
    textStyle={styles.disableButton}
    type="ghost"
    onPress={handler}
  />
);

const ShareButton = (handler) => (
  <Button
    key="share"
    size="large"
    style={styles.shareButton}
    text="Share link"
    onPress={handler}
  />
);

const listLinkActivities = (access) => (
  <ListItem
    key={`${access.dateRaw}`}
    icon="eye"
    label={`Accessed at ${access.time}`}
    actionSymbolName="none"
    description={(
      <Text.BodySmall color="medium">{access.date}</Text.BodySmall>
    )}
    squarePreview
  />
);

const SharedLinkActivity = ({ navigation }) => {
  const folderUniqueName = navigation.getParam('folderUniqueName');
  const shareId = navigation.getParam('shareId');
  const dispatch = useDispatch();
  const linkDatum = useSelector(shareSelectors.allLinkDataSelector)
    .find((datum) => datum.shareId === shareId);
  const profileCode = useSelector(profileSelectors.currentProfileCodeSelector);
  const {
    accessed,
    deleted,
    secure: initialSecure,
  } = linkDatum;
  const [secure, setSecure] = useState(initialSecure);
  const sharedLink = api.config.huddleWebShareUrl(shareId);

  const handleSharePress = async () => {
    try {
      await api.sharing.share({
        folderUniqueName,
        secure,
        shareId,
      }, profileCode);

      await handleShareAction(sharedLink);
      dispatch(shareActions.updateLink(shareId, secure));
    } catch (error) {
      Alert.error(api.userMessages.sharingShare.error);
    }
  };

  const handleDisablePress = () => {
    dispatch(overlayActions.show(DisableLink, {
      shareId,
    }));
  };

  const disabledText = `Disabled on ${deleted}, no longer accessible`;
  let controls = null;

  if (!deleted) {
    controls = [ShareButton(handleSharePress), DisableButton(handleDisablePress)];
  }

  return (
    <BottomButtonLayout control={controls}>
      {!deleted && (
        <TouchableOpacity onPress={() => Linking.openURL(sharedLink)}>
          <Text style={styles.bodyText}>{sharedLink}</Text>
        </TouchableOpacity>
      )}
      {!deleted && <ToggleSecure selected={secure} onToggle={setSecure} />}
      {!!deleted && <Text style={styles.bodyText}>{disabledText}</Text>}
      {!!accessed && !!accessed.length && <Text.H2 style={styles.h2}>Activity</Text.H2>}
      {!!accessed && accessed.map(listLinkActivities)}
    </BottomButtonLayout>
  );
};

SharedLinkActivity.navigationOptions = ({ navigation }) => ({
  title: `Link created ${navigation.getParam('created')}`,
});

export default SharedLinkActivity;
