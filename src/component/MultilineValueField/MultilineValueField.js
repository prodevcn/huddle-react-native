import React from 'react';
import { NavigationEvents } from 'react-navigation';

import Text from '/component/Text';
import Field from '/component/Field';
import useValueFieldAnimation from '/hook/useValueFieldAnimation';

import styles from './MultilineValueField.styles';

import useTimeout from '/hook/useTimeout';

const ValueField = ({
  label,
  value,
  onPress,
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
      labelRelativePosition={value}
      labelInEndPosition={value}
      animation={animation}
      onWrapperPress={handlePress}
      label={label}
      style={style}
      wrapperStyle={value && styles.fieldWithValue}
      error={error}
    >
      <NavigationEvents onWillFocus={blur} />
      <Text style={[value && styles.textWithValue]}>
        {value}
      </Text>
      <Field.Border animation={animation} active={focused} error={error} />
    </Field>
  );
};

export default ValueField;
