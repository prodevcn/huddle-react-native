import React from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import BottomSheet, { BottomSheetRow } from '/component/BottomSheet';
import { actions } from '/state/overlays';

import styles from './ActionSheet.styles';

export const Line = () => <View style={styles.line} />;

const ActionSheet = ({
  // data should be an array of {value, label} pairs.
  // The value is what is used to control the select, and
  // the label is what is rendered to the user
  data,
  onChange,
  initialValue,
  animation,
}) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(actions.dismiss());
    onChange(value);
  };

  return (
    <BottomSheet animation={animation}>
      <ScrollView style={styles.scrollview}>
        {data.map(({ value, label }, i) => {
          const active = initialValue === value;

          return (
            <View key={value}>
              {i > 0 && (<Line />)}
              <BottomSheetRow
                onPress={() => handleChange(value)}
                label={label}
                style={styles.row}
                textStyle={[styles.text, active && styles.activeText]}
                isFirst={i === 0}
                hideChevron
              />
            </View>
          );
        })}
      </ScrollView>
    </BottomSheet>
  );
};

export default ActionSheet;
