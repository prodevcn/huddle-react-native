import React from 'react';

import { TouchableOpacity, Animated, View } from 'react-native';

import Text from '/component/Text';
import Icon from '/component/Icon';

import globalStyles from '/styles';
import styles, { stylesByType } from './Alert.styles';

const getIcon = (type) => {
  if (type === 'warning') {
    return { icon: 'alert', iconColor: globalStyles.palette.orange };
  }
  if (type === 'success') {
    return { icon: 'checkmark', iconColor: globalStyles.palette.teal };
  }
  return { icon: 'information', iconColor: globalStyles.palette.white };
};

const getTextColor = (type) => {
  if (type === 'general') {
    return {
      descriptionColor: globalStyles.palette.grey01,
      titleColor: globalStyles.palette.deepBlue,
    };
  }

  return {
    descriptionColor: globalStyles.palette.white,
    titleColor: globalStyles.palette.white,
  };
};

const Alert = ({
  type = 'general',
  title,
  description,
  style,
  isVisible,
  onPress,
}) => {
  const { icon, iconColor } = getIcon(type);
  const { descriptionColor, titleColor } = getTextColor(type);

  return (
    <Animated.View
      style={style}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <TouchableOpacity
        style={[styles.wrapper, stylesByType[type].wrapper]}
        onPress={onPress}
        activeOpacity={0.95}
      >
        <View style={[styles.iconWrapper, stylesByType[type].iconWrapper]}>
          <Icon name={icon} size={24} color={iconColor} />
        </View>
        <View style={styles.textWrapper}>
          <Text.BodySmall
            weight="medium"
            style={[styles.title, { color: titleColor }]}
            numberOfLines={1}
          >
            {title}
          </Text.BodySmall>
          <Text.BodySmall
            style={[styles.desciption, { color: descriptionColor }]}
            numberOfLines={3}
          >
            {description}
          </Text.BodySmall>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Alert;
