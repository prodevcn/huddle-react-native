import React from 'react';
import { TouchableOpacity, View, SectionList } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import Checkbox from '/component/Checkbox';
import Text from '/component/Text';
import { SectionFooter, SectionHeader, groupByDate } from '/partial/ItemList';
import SelectItem from '/screen/Folders/component/SelectItem';

import { actions as folderActions, selectors as foldersSelectors } from '/state/folders';
import { selectors as itemsSelectors } from '/state/items';

import styles from './FolderSelectItems.styles';

const FolderAddItems = ({ navigation }) => {
  const dispatch = useDispatch();

  const folderUniqueName = navigation.getParam('folderUniqueName');
  const scopedFolderId = navigation.getParam('scopedFolderId');

  const folder = useSelector(foldersSelectors.allFoldersSelector)[folderUniqueName];
  const scopedFolder = useSelector(foldersSelectors.allFoldersSelector)[scopedFolderId];

  const selectedItems = useSelector(foldersSelectors.selectedItemsSelector);

  let items = useSelector(itemsSelectors.itemsSelector, shallowEqual);
  // We don't want to include items that are already in this folder
  items = items.filter((item) => {
    const folderItems = folder.docUniqueName || [];
    const scopedFolderItems = scopedFolder.docUniqueName || [];

    return folderItems.indexOf(item.docUniqueName) === -1
    && scopedFolderItems.indexOf(item.docUniqueName) !== -1;
  });

  // Are all items in the list selected?
  const allSelected = !items.find((item) => selectedItems.indexOf(item.docUniqueName) === -1);

  const renderItem = ({ item }) => (
    <SelectItem item={item} />
  );

  const renderSection = ({ section: { title } }) => (
    <SectionHeader title={title} />
  );

  const keyExtractor = (item) => item.docUniqueName || item.folderUniqueName;

  const toggleItems = (selectAll) => {
    const itemIds = items.map((item) => item.docUniqueName);
    if (selectAll) {
      dispatch(folderActions.selectItems(itemIds));
    } else {
      dispatch(folderActions.unselectItems(itemIds));
    }
  };

  const handleTogglePress = () => {
    toggleItems(!allSelected);
  };

  const handleCheckChange = (checked) => {
    toggleItems(checked);
  };

  const buttonText = `${allSelected ? 'Unselect' : 'Select'} all ${items.length} records in folder`;

  return (
    <View style={{ flex: 1 }}>
      {items.length > 1 && (
        <TouchableOpacity style={styles.selectAllButton} onPress={handleTogglePress}>
          <Checkbox
            style={styles.checkboxWrapper}
            onChange={handleCheckChange}
            checked={allSelected}
          />
          <Text>{buttonText}</Text>
        </TouchableOpacity>
      )}

      <SectionList
        keyboardShouldPersistTaps="handled"
        sections={groupByDate(items)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        renderSectionHeader={renderSection}
        renderSectionFooter={SectionFooter}
      />
    </View>
  );
};

FolderAddItems.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default FolderAddItems;
