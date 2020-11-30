import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Text from '/component/Text';
import Icon from '/component/Icon';

import globalStyles from '/styles';

import useTimeout from '/hook/useTimeout';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: globalStyles.padding.sm,
  },
});

const SettingItem = ({
  title,
  onPress,
  children,
  testID,
}) => {
  const handlePress = useTimeout(onPress);
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={handlePress}
      testID={testID}
    >
      {children && children}

      {!children && (
        <>
          <Text>{title}</Text>
          <Icon name="chevron-right" />
        </>
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;
