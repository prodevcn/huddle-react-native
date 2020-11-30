import React from 'react';

import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import Text from '/component/Text';
import Icon from '/component/Icon';
import ListItem from '/component/ListItem';
import { SectionHeader } from '/partial/ItemList';
import { selectors as profileSelectors } from '/state/profiles';
import HorizontalFolderList from '/screen/Items/component/HorizontalFolderList';

import styles from './ListEmptyComponent.styles';
import screens from '/screen';

import { folders, itemList, items } from './mockData';

const ListEmptyComponent = ({ navigation }) => {
  const activeProfile = useSelector(profileSelectors.activeProfileSelector);
  const isMaster = useSelector(profileSelectors.activeProfileIsMasterSelector);

  const handleHomePress = () => {
    navigation.navigate(screens.Home);
  };

  if (!activeProfile) {
    return null;
  }

  const name = isMaster ? 'You don\'t' : `${activeProfile.firstName} doesn't`;

  // Hardcoded items that appear greyed out and are non-clickable
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.card} onPress={handleHomePress}>
        <Text color="white" style={styles.cardText}>
          {name}
          {' '}
          have any items yet.
          {'\n'}
          Visit Home to get started.
        </Text>
        <Icon color="white" name="arrow-right" style={styles.arrow} size={20} />
      </TouchableOpacity>
      <View style={styles.list} pointerEvents="none">
        <HorizontalFolderList
          folders={folders}
          items={items}
        />
        <SectionHeader title="April 22, 2019" />
        {itemList.map((item) => (
          <ListItem
            key={item.docUniqueName}
            icon={item.icon}
            label={item.displayName}
            description={item.description}
            squarePreview
          />
        ))}
      </View>
    </View>
  );
};

export default ListEmptyComponent;
