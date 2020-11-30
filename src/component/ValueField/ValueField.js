import React from 'react';
import { NavigationEvents } from 'react-navigation';

import { View } from 'react-native';

import Icon from '/component/Icon';
import Text from '/component/Text';
import Field from '/component/Field';

import globalStyles from '/styles';
import styles from './ValueField.styles';
import useValueFieldAnimation from '/hook/useValueFieldAnimation';
import useTimeout from '/hook/useTimeout';

const ValueField = ({
  label,
  value,
  onPress,
  hideChevron,
  style,
  error,
  animateBlur,
}) => {
  const {
    animation, focused, focus, blur,
  } = useValueFieldAnimation(animateBlur, onPress);

  const handlePress = useTimeout(focus);

  return (
    <Field
      labelInEndPosition={value}
      animation={animation}
      onWrapperPress={handlePress}
      label={label}
      style={style}
      error={error}
    >
      <NavigationEvents onWillFocus={blur} />
      <View style={styles.content}>
        <Text style={styles.text} numberOfLines={1}>{value}</Text>
        {!hideChevron && (
          <Icon name="chevron-right" color={globalStyles.palette.grey01} size={16} />
        )}
      </View>
      <Field.Border animation={animation} active={focused} error={error} />
    </Field>
  );
};

export default ValueField;
