import React from 'react';

import { TouchableOpacity, View } from 'react-native';

import DetailedIcon from '/component/DetailedIcon';
import Icon from '/component/Icon';
import Text from '/component/Text';
import format from '/util/format';

import styles from './FolderListItem.styles';

import useTimeout from '/hook/useTimeout';

const FolderListItem = ({ folder, onPress, style }) => {
  const date = format.toRelativeDate(folder.modifyTimestamp);
  const handlePress = useTimeout(onPress);

  let count = folder.docUniqueName.length;
  count = `${count} Item${count === 1 ? '' : 's'}`;

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.wrapper, style]}>
      <DetailedIcon.Folder />
      <View style={styles.textWrapper}>
        <Text.H4 style={styles.header}>
          {folder.displayName}
        </Text.H4>
        <Text.Label color="medium" style={styles.label}>
          {count} · Updated {date}
        </Text.Label>
      </View>
      <Icon name="chevron-right" size={16} />
    </TouchableOpacity>
  );
};

export default FolderListItem;
