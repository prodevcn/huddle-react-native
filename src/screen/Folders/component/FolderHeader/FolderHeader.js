import React from 'react';
import { View } from 'react-native';

import Text from '/component/Text';
import DetailedIcon from '/component/DetailedIcon';

import styles from './FolderHeader.styles';

const Folder = ({ folder }) => (
  <View style={styles.wrapper}>
    <DetailedIcon.Folder />
    <Text.H2 style={styles.text}>
      {folder.displayName}
    </Text.H2>
  </View>
);

export default Folder;
