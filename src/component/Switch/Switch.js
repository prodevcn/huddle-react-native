import React from 'react';
import { Switch as RNSwitch, View, StyleSheet } from 'react-native';

import palette from '/styles/palette';
import Text from '/component/Text';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Switch = ({
  value, label, onChange, disabled, style,
}) => {
  const handleOnChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <View style={[styles.root, style]}>
      {label && <Text>{label}</Text>}
      <RNSwitch
        onValueChange={handleOnChange}
        value={value}
        disabled={disabled}
        trackColor={{
          true: palette.teal,
        }}
      />
    </View>
  );
};

export default Switch;
