import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';

import Text from '/component/Text';
import AddButton from '/partial/AddButton';
import FolderListItem from '/partial/FolderListItem';

import styles from './Folders.styles';
import { selectors } from '/state/folders';
import { selectors as profilesSelectors } from '/state/profiles';

import screens from '/screen';
import { clickHandler } from '/util/offlineMode';

const Folders = ({ navigation }) => {
  const folders = useSelector(selectors.foldersSelector);
  const readOnlyActiveProfile = useSelector(profilesSelectors.readOnlyActiveProfileSelector);

  const handleCreatePress = () => {
    navigation.push(screens.FolderFormStack);
  };

  const handleFolderPress = (folder) => () => {
    navigation.push(screens.Folder, { folderUniqueName: folder.folderUniqueName });
  };

  const keyExtractor = (item) => item.folderUniqueName;
  const renderItem = ({ item: folder }) => (
    <FolderListItem
      folder={folder}
      style={styles.folder}
      onPress={handleFolderPress(folder)}
    />
  );

  return (
    <View style={styles.wrapper}>
      <Text.H2 style={styles.header}>Folders</Text.H2>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={() => !readOnlyActiveProfile && (
          <AddButton
            icon="Folder"
            text="Create a new folder"
            onPress={clickHandler(handleCreatePress)}
            style={styles.addButton}
          />
        )}
        data={folders}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Folders;
