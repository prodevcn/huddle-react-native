/**
 * This component renders a text button, with no background and an
 * optional `icon`
 */
import React from 'react';

import { TouchableOpacity } from 'react-native';

import Icon from '/component/Icon';
import Text from '/component/Text';

import globalStyles from '/styles';
import styles from './Link.styles';

const Link = ({
  onPress,
  icon,
  iconColor = globalStyles.palette.teal,
  text,
  style,
  textStyle,
  testID,
}) => (
  <TouchableOpacity
    style={[styles.wrapper, style]}
    onPress={onPress}
    testID={testID}
  >
    {!!icon && <Icon color={iconColor} name={icon} style={styles.icon} />}
    {!!text && <Text style={textStyle}>{text}</Text>}
  </TouchableOpacity>
);

export default Link;
