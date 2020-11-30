import React from 'react';

import { SectionList, Image, View } from 'react-native';

import { shallowEqual, useSelector } from 'react-redux';

import Text from '/component/Text';
import Button from '/component/Button';
import folderImage from 'assets/illustrations/folder.png';
import EmptyFolderItem from '/screen/Folders/component/EmptyFolderItem';

import { groupByDate, SectionFooter, SectionHeader } from '/partial/ItemList';
import { selectors as itemSelectors } from '/state/items';

import styles from './EmptyFolder.styles';

import screens from '/screen';

const EmptyFolder = ({ navigation, folder }) => {
  const items = useSelector(itemSelectors.itemsSelector, shallowEqual);
  const groupedItems = groupByDate(items);

  const handleAddItemsPress = () => {
    navigation.push(screens.FolderAddItemsStack, {
      folderUniqueName: folder.folderUniqueName,
      title: folder.displayName,
    });
  };

  const Header = (
    <View style={styles.header}>
      <Image
        style={styles.illustration}
        source={folderImage}
      />
      <Text.H5 style={styles.headerText}>
        It&apos;s looking a little empty in here, why not add some items
      </Text.H5>
      <Button
        onPress={handleAddItemsPress}
        style={styles.headerButton}
        text="Add Items"
      />
      <View style={styles.recentItemsLabel}>
        <Text.H4>Recent Items</Text.H4>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <EmptyFolderItem
      item={item}
      folder={folder}
    />
  );

  const keyExtractor = (item) => item.docUniqueName;

  return (
    <SectionList
      contentContainerStyle={styles.scrollContent}
      ListHeaderComponent={Header}
      sections={groupedItems}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeader title={title} />
      )}
      renderSectionFooter={SectionFooter}
    />
  );
};

export default EmptyFolder;
