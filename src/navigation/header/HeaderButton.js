import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import TutorialAnchor from '/component/TutorialAnchor';
import Icon from '/component/Icon';

import globalStyles from '/styles';

export const BUTTON_HEIGHT = 44;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: BUTTON_HEIGHT,
    height: BUTTON_HEIGHT,
  },
  rightButton: {
    justifyContent: 'flex-end',
  },
});

const HeaderButton = ({
  icon,
  style,
  children,
  onPress,
  color = globalStyles.palette.deepBlue,
  isTutorialAnchor,
  right,
}) => {
  const Wrapper = isTutorialAnchor ? TutorialAnchor : View;

  const buttonStyle = [styles.button, right && styles.rightButton];

  return (
    <Wrapper style={style}>
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <Icon name={icon} color={color} size={20} />
        {children}
      </TouchableOpacity>
    </Wrapper>
  );
};

HeaderButton.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default HeaderButton;
