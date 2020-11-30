import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from '/component/Icon';
import DetailedIcon from '/component/DetailedIcon';
import Text from '/component/Text';

import globalStyles from '/styles';
import styles from './BottomSheetRow.styles';

import useTimeout from '/hook/useTimeout';

const BottomSheetRow = ({
  style,
  textStyle,
  onPress,
  icon,
  label,
  iconColor = globalStyles.palette.grey01,
  hideChevron,
  isFirst,
}) => {
  let iconChild;
  if (DetailedIcon[icon]) {
    const IconComponent = DetailedIcon[icon];
    iconChild = <IconComponent />;
  } else if (icon) {
    iconChild = <Icon name={icon} color={iconColor} />;
  }

  const handleTouch = useTimeout(onPress);

  return (
    <TouchableOpacity
      style={[
        styles.row,
        isFirst && styles.firstRow,
        style,
      ]}
      onPress={handleTouch}
    >
      {iconChild}
      <Text style={[styles.text, textStyle]}>{label}</Text>
      {!hideChevron && (
        <Icon name="chevron-right" color={globalStyles.palette.grey01} size={16} />
      )}
    </TouchableOpacity>
  );
};

export default BottomSheetRow;
