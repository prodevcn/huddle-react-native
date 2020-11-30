import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import without from 'lodash/without';

import Text from '/component/Text';
import Button from '/component/Button';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import FolderHeader from '/screen/Folders/component/FolderHeader';
import HeaderButton from '/navigation/header/HeaderButton';
import ItemListItem from '/partial/ItemListItem';

import styles from './FolderDeleteItems.styles';
import { selectors as folderSelectors, actions as folderActions } from '/state/folders';
import { selectors as itemSelectors } from '/state/items';
import globalStyles from '/styles';

import Alert from '/overlay/Alert';
import api from '/api';

const FolderDeleteItem = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const folderUniqueName = navigation.getParam('folderUniqueName');
  const folder = useSelector(folderSelectors.allFoldersSelector)[folderUniqueName];
  const items = useSelector(itemSelectors.itemsHashSelector);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await dispatch(folderActions.removeItemsFromFolder(folderUniqueName, selectedItems));
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

  const handleItemSelected = (itemId) => () => {
    const selected = selectedItems.indexOf(itemId) > -1;

    if (selected) {
      setSelectedItems(without(selectedItems, itemId));
    } else {
      setSelectedItems([
        ...selectedItems,
        itemId,
      ]);
    }
  };

  let buttonText = 'Remove Items';
  if (selectedItems.length) {
    buttonText = `Remove ${selectedItems.length} Item${selectedItems.length === 1 ? '' : 's'}`;
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

  const Header = () => (
    <Text color="medium" fontSize={16} FontWeight={24} style={styles.headerText}>
      Select items to remove from this folder. Items will still be visible in other locations.
    </Text>
  );

  const keyExtractor = (item) => item.docUniqueName;
  const data = folder.docUniqueName.map((docId) => items[docId]);
  const renderItem = ({ item }) => (
    <ItemListItem
      item={item}
      hideActionSymbol
      selected={selectedItems.indexOf(item.docUniqueName) > -1}
      onCheckChange={handleItemSelected(item.docUniqueName)}
      onPress={handleItemSelected(item.docUniqueName)}
    />
  );

  return (
    <View style={styles.wrapper}>
      <FolderHeader folder={folder} />
      <BottomButtonLayout
        data={data}
        renderItem={renderItem}
        ScrollComponent={FlatList}
        ListHeaderComponent={Header}
        control={submitButton}
        keyExtractor={keyExtractor}
        additionalData={selectedItems}
      />
    </View>
  );
};

FolderDeleteItem.navigationOptions = ({ navigation, navigationOptions }) => ({
  headerStyle: {
    ...navigationOptions.headerStyle,
    backgroundColor: globalStyles.palette.grey04,
  },
  headerLeft: () => <HeaderButton icon="back" onPress={() => navigation.dismiss()} />,
});

export default FolderDeleteItem;
