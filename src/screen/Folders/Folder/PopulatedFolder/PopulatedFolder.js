import React from 'react';

import { View, FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import AddButton from '/partial/AddButton';
import ItemListItem from '/partial/ItemListItem';

import styles from './PopulatedFolder.styles';
import { selectors as itemSelectors } from '/state/items';
import { selectors as profilesSelectors } from '/state/profiles';
import { actions as mixpanelActions } from '/state/mixpanel';
import * as events from '/constants/events/Folders/viewFolder';
import { clickHandler } from '/util/offlineMode';

import screens from '/screen';

const PopulatedFolder = ({ navigation, folder }) => {
  const dispatch = useDispatch();
  const allItems = useSelector(itemSelectors.itemsHashSelector);
  const readOnlyActiveProfile = useSelector(profilesSelectors.readOnlyActiveProfileSelector);
  const items = folder.docUniqueName.map((docId) => allItems[docId]);

  const handleItemPress = (item) => () => {
    dispatch(mixpanelActions.trackEvent(events.CLICK_ITEM));
    navigation.push(screens.ItemStack, { itemId: item.docUniqueName });
  };

  const handleAddPress = () => {
    navigation.push(screens.FolderAddItemsStack, {
      folderUniqueName: folder.folderUniqueName,
      title: folder.displayName,
    });
  };

  const renderItem = ({ item }) => (
    <ItemListItem
      item={item}
      onPress={handleItemPress(item)}
    />
  );

  const keyExtractor = (item) => item.docUniqueName;

  return (
    <FlatList
      contentContainerStyle={styles.scrollContent}
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={() => !readOnlyActiveProfile && (
        <View style={styles.header}>
          <AddButton
            text="Add a new item to this folder"
            onPress={clickHandler(handleAddPress)}
          />
        </View>
      )}
    />
  );
};

export default PopulatedFolder;
