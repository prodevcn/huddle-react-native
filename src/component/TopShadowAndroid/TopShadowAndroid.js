/**
 * For the most part you should use the `elevation` style property
 * to create a shadow on Android. But in some rare occassions
 * that won't work - such as if you need the shadow to go **up**
 * from the element. In those cases, you can use this component
 */
import React from 'react';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './TopShadowAndroid.styles';
import globalStyles from '/styles';

const TopShadowAndroid = ({ style }) => {
  if (Platform.OS === 'ios') return null;

  return (
    <LinearGradient
      colors={[globalStyles.palette.white, globalStyles.palette.deepBlue]}
      style={[styles.shadow, style]}
    />
  );
};

export default TopShadowAndroid;
