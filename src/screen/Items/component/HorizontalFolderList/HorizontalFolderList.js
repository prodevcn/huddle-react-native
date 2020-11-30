import React from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import Text from '/component/Text';
import Icon from '/component/Icon';
import FolderCard from '/partial/card/FolderCard';
import AddButton from '/partial/AddButton';
import { selectors as profilesSelectors } from '/state/profiles';

import styles from './HorizontalFolderList.styles';
import globalStyles from '/styles';

import screens from '/screen';

import useTimeout from '/hook/useTimeout';
import { clickHandler } from '/util/offlineMode';

const HorizontalFolderList = ({ navigation, folders, items }) => {
  const readOnlyActiveProfile = useSelector(profilesSelectors.readOnlyActiveProfileSelector);

  const handleFolderPress = (folderUniqueName) => () => {
    navigation.push(screens.Folder, {
      folderUniqueName,
    });
  };

  const renderFolder = ({ item: folder }) => (
    <FolderCard
      style={styles.folder}
      folder={folder}
      onPress={handleFolderPress(folder.folderUniqueName)}
      items={items}
    />
  );

  const getKeyExtractor = (item) => item.folderUniqueName;

  const handleViewAllPress = () => {
    navigation.push(screens.Folders);
  };

  const isEmpty = folders.length === 0;

  const handleAddPress = () => {
    navigation.push(screens.FolderFormStack);
  };

  const handleViewAllTimeout = useTimeout(handleViewAllPress);

  if (isEmpty && readOnlyActiveProfile) {
    return null;
  }

  return (
    <View>
      <View style={styles.header}>
        <Text.H3>Folders</Text.H3>
        {!isEmpty && (
          <TouchableOpacity style={styles.viewAll} onPress={handleViewAllTimeout}>
            <Text.BodySmall color="medium" style={styles.viewAllText}>
              View all {folders.length > 1 ? folders.length : ''} folders
            </Text.BodySmall>
            <Icon name="chevron-right" color={globalStyles.palette.grey01} size={14} />
          </TouchableOpacity>
        )}
      </View>

      {isEmpty && (
        <AddButton
          icon="Folder"
          style={styles.addButton}
          onPress={clickHandler(handleAddPress)}
          text={(
            <Text.Plain>
              You don&apos;t have any folders yet.
              {'\n'}
              Tap here to create your first folder.
            </Text.Plain>
          )}
        />
      )}

      {!isEmpty && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          horizontal
          data={folders}
          renderItem={renderFolder}
          keyExtractor={getKeyExtractor}
        />
      )}
      <Text.H4 style={styles.itemHeader}>All Items</Text.H4>
    </View>
  );
};

export default HorizontalFolderList;
