/**
 * Use this component if you need to extend the top of a scrollview to make
 * it appear to go up forever, even if the user bounces the scrollview
 */

import React from 'react';
import { View } from 'react-native';

import styles from './BackgroundExtension.styles';

const BackgroundExtension = ({ style }) => <View style={[styles.extension, style]} />;

export default BackgroundExtension;
