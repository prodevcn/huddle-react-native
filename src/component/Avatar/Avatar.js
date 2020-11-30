/**
 * This component will return an image avatar if the `profile.avatar` prop
 * is non-null. Otherwise it will return the users initials with a random,
 * but persisted, background colour
 */
import React from 'react';
import { View, Image } from 'react-native';

import Text from '/component/Text';

import { getStringSum, format } from '/util';

import styles, { stylesBySize, colors } from './Avatar.styles';

const Avatar = ({
  profile = {},
  style,
  size = 'regular',
  preview,
}) => {
  const { firstName, lastName, avatar } = profile;

  const wrapperStyle = [styles.wrapper, styles.image, stylesBySize[size], style];

  if (preview || avatar) {
    return <Image source={{ uri: preview || avatar }} style={wrapperStyle} />;
  }

  const initials = format.getInitials(firstName, lastName);

  const count = getStringSum(firstName + lastName);
  const backgroundColor = colors[count % colors.length];

  return (
    <View style={[{ backgroundColor }, wrapperStyle]}>
      <Text.H4 color="white">{initials}</Text.H4>
    </View>
  );
};

export default Avatar;
