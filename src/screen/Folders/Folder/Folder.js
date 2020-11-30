import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import HeaderButton from '/navigation/header/HeaderButton';
import buildHeaderRight from '/navigation/helpers/buildHeaderRight';
import FolderMore from '/overlay/FolderMore';
import FolderHeader from '/screen/Folders/component/FolderHeader';
import EmptyList from '/partial/EmptyList';

import styles from './Folder.styles';
import { selectors } from '/state/folders';
import globalStyles from '/styles';
import { store } from '/state/store';

import { actions as mixpanelActions } from '/state/mixpanel';
import { actions as overlayActions } from '/state/overlays';
import { selectors as profilesSelectors } from '/state/profiles';
import * as events from '/constants/events/Folders/viewFolder';

import PopulatedFolder from './PopulatedFolder';
import EmptyFolder from './EmptyFolder';
import { clickHandler } from '/util/offlineMode';

import screens from '/screen';

const Folder = ({ navigation }) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const folderUniqueName = navigation.getParam('folderUniqueName');
  const readOnlyActiveProfile = useSelector(profilesSelectors.readOnlyActiveProfileSelector);
  const folder = useSelector(selectors.allFoldersSelector)[folderUniqueName];

  // When the component mounts we will set whether or not we are showing the empty list.
  // We will allow users to add items to the empty list without changing the UI.
  useEffect(() => {
    if (!folder.docUniqueName.length) {
      setIsEmpty(true);
    }
  }, []);

  const childProps = { navigation, folder };

  let child;
  if (isEmpty) {
    if (readOnlyActiveProfile) {
      child = (
        <EmptyList style={styles.emptyList}>
          It&apos;s looking a little empty in here
        </EmptyList>
      );
    } else {
      child = <EmptyFolder {...childProps} />;
    }
  } else {
    child = <PopulatedFolder {...childProps} />;
  }

  return (
    <View style={styles.wrapper}>
      <FolderHeader folder={folder} />
      <View style={styles.childWrapper}>
        {child}
      </View>
    </View>
  );
};

Folder.navigationOptions = ({ navigation, navigationOptions }) => {
  const readOnlyActiveProfile = profilesSelectors.readOnlyActiveProfileSelector(store.getState());

  return ({
    headerStyle: {
      ...navigationOptions.headerStyle,
      backgroundColor: globalStyles.palette.grey04,
    },
    headerLeft: () => {
    // If we show this screen programatically after showing a folder, we want the
    // back button to dismiss the folder stack
      const dismiss = navigation.getParam('dismissOnBack');
      const action = dismiss ? navigation.dismiss : navigation.pop;

      return <HeaderButton icon="back" onPress={() => action()} />;
    },
    headerRight: buildHeaderRight([
      {
        icon: 'share',
        onPress: clickHandler(() => {
          store.dispatch(mixpanelActions.trackEvent(events.CLICK_SHARE));
          navigation.push(screens.ShareLinkStack, {
            folderUniqueName: navigation.getParam('folderUniqueName'),
          });
        }),
      },
      !readOnlyActiveProfile && {
        icon: 'more',
        onPress: clickHandler(() => {
          store.dispatch(mixpanelActions.trackEvent(events.CLICK_DOTS));
          store.dispatch(overlayActions.show(FolderMore, {
            folderUniqueName: navigation.getParam('folderUniqueName'),
            navigation,
          }));
        }),
      },
    ]),
  });
};

export default Folder;
