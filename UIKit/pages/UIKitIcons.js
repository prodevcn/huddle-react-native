import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';

import Icon from '/component/Icon';

import styles from '../UIKit.styles';

import DetailedIcon from '/component/DetailedIcon/DetailedIcon';

const icons = Object.keys(Icon.iconNames).sort((i1, i2) => {
  if (i1 < i2) return -1;
  if (i1 > i2) return 1;
  return 0;
});

const detailed = Object.keys(DetailedIcon);

const UIKitIcon = ({ name, children }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    }}
  >
    {children}
    <Text style={{ marginLeft: 12 }}>{name}</Text>
  </View>
);

export default () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={styles.contentContainer}
    style={styles.scrollView}
  >
    {icons.map((icon) => (
      <UIKitIcon name={icon} key={icon}>
        <Icon name={icon} />
      </UIKitIcon>
    ))}

    {detailed.map((icon) => {
      const Detailed = DetailedIcon[icon];
      return (
        <UIKitIcon name={icon} key={icon}>
          <Detailed />
        </UIKitIcon>
      );
    })}
  </ScrollView>
);
