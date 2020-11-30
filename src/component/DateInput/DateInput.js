import React from 'react';

import TextInput from '/component/TextInput';
import isValid from './isValid';

import useFormFieldLabel from '/hook/useFormFieldLabel';

const DateInput = ({
  onChangeText,
  errorMessage,
  value,
  ...rest
}) => {
  const {
    allowErrorMessage,
    handleTextChange,
  } = useFormFieldLabel({
    onChangeText,
    value,
    isValid,
  });

  // When we press a key we do some magic to figure out what
  // our new value should be
  return (
    <TextInput
      {...rest}
      keyboardType="number-pad"
      onChangeText={handleTextChange}
      errorMessage={allowErrorMessage(errorMessage)}
      placeholder="MM/DD/YYYY"
      value={value}
      maskProps={{
        type: 'datetime',
        options: {
          format: 'MM/DD/YYYY',
        },
      }}
    />
  );
};

export default DateInput;
