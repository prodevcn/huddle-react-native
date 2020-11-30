import React, { useEffect, useState } from 'react';
import { View, SectionList } from 'react-native';
import isArray from 'lodash/isArray';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import without from 'lodash/without';

import Button from '/component/Button';
import Text from '/component/Text';
import SearchInput from '/component/SearchInput';
import { SectionFooter, SectionHeader, groupByDate } from '/partial/ItemList';
import FolderListItem from '/partial/FolderListItem';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import HeaderButton from '/navigation/header/HeaderButton';
import SelectItem from '/screen/Folders/component/SelectItem';

import Alert from '/overlay/Alert';
import api from '/api';

import { actions as folderActions, selectors as foldersSelectors } from '/state/folders';
import { selectors as itemsSelectors } from '/state/items';
import { actions as mixpanelActions } from '/state/mixpanel';

import * as addItemEvents from '/constants/events/Folders/addItem';

import styles from './FolderAddItems.styles';
import screens from '/screen';

const FolderAddItems = ({ navigation }) => {
  const folderUniqueName = navigation.getParam('folderUniqueName');
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const regex = new RegExp(searchTerm, 'i');
  const filter = (item) => item.displayName.match(regex);

  useEffect(() => () => (
    dispatch(folderActions.clearSelectedItems())
  ), []);

  const folder = useSelector(foldersSelectors.allFoldersSelector)[folderUniqueName];
  const folderItems = folder.docUniqueName || [];

  const selectedItems = useSelector(foldersSelectors.selectedItemsSelector);

  const items = useSelector(itemsSelectors.itemsSelector, shallowEqual);
  let folders = useSelector(foldersSelectors.foldersSelector, shallowEqual);
  // Remove the current folder from the list of folders and then
  // filter all items that are in the current folder from each folder
  folders = without(folders, folder)
    .map((otherFolder) => {
      const { docUniqueName } = otherFolder;

      return {
        ...otherFolder,
        docUniqueName: docUniqueName.filter((itemId) => {
          const inFolder = folderItems.indexOf(itemId) === -1;
          return inFolder;
        }),
      };
    });

  // We don't want to include items that are already in this folder
  const filteredItems = items.filter((item) => {
    const notInFolder = folderItems.indexOf(item.docUniqueName) === -1;
    return notInFolder && filter(item);
  });

  // Don't show the current folder in the list of folders at the top of the screen
  // Also don't include any empty folders.
  const filteredFolders = folders.filter((f) => {
    const notEmpty = f.docUniqueName.length;
    return notEmpty && filter(f);
  });

  const grouped = groupByDate(filteredItems);
  if (filteredItems.length) {
    grouped.unshift({ headerText: 'All Items', data: [] });
  }

  if (filteredFolders.length) {
    grouped.unshift({ headerText: 'Folders', data: filteredFolders });
  }

  const handleFolderPress = (scopedFolder) => () => {
    navigation.push(screens.FolderSelectItems, {
      folderUniqueName,
      scopedFolderId: scopedFolder.folderUniqueName,
      title: scopedFolder.displayName,
    });
  };

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const handleSubmit = async () => {
    dispatch(mixpanelActions.trackEvent(addItemEvents.CLICK_ADD_ITEM));
    setLoading(true);
    try {
      await dispatch(folderActions.addSelectedItems(folderUniqueName));
      navigation.dismiss();
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

  const renderItem = ({ item }) => {
    // Folders have an array of `docUniqueName`s, so we will use that to determine if
    // we need to render an item or a folder
    if (isArray(item.docUniqueName)) {
      return (
        <FolderListItem
          folder={item}
          style={styles.folder}
          onPress={handleFolderPress(item)}
        />
      );
    }

    return (
      <SelectItem item={item} />
    );
  };

  const renderSectionHeader = ({ section }) => {
    if (section.headerText) {
      return (
        <View style={[styles.header, styles.folderHeader]}>
          <Text.H4>{section.headerText}</Text.H4>
        </View>
      );
    }

    return (
      <SectionHeader title={section.title} />
    );
  };

  const keyExtractor = (item) => {
    if (isArray(item.docUniqueName)) {
      return item.folderUniqueName;
    }
    return item.docUniqueName;
  };


  let buttonText = 'Add Items';
  if (selectedItems.length) {
    buttonText = `Add ${selectedItems.length} Item${selectedItems.length === 1 ? '' : 's'}`;
  }

  const submitButton = (
    <Button
      size="large"
      disabled={!selectedItems.length}
      text={buttonText}
      onPress={handleSubmit}
      loading={loading}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchInput
        onChangeText={handleSearchChange}
        style={styles.search}
        placeholder="Search Records..."
      />

      <BottomButtonLayout
        control={submitButton}
        ScrollComponent={SectionList}
        keyboardShouldPersistTaps="handled"
        sections={grouped}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={SectionFooter}
      />
    </View>
  );
};

FolderAddItems.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title') || 'Add Items',
  headerLeft: () => <HeaderButton icon="back" onPress={() => navigation.dismiss()} />,
});

export default FolderAddItems;
