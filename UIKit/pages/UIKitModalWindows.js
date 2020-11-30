import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import Button from '/component/Button';
import BottomSheet from '/component/BottomSheet';

import styles from '../UIKit.styles';
import globalStyles from '/styles';

import screens from '/screen';

const UIKitModalWindows = ({ navigation }) => {
  const [visibleModalContentHeight, setVisibleModalContentHeight] = useState(false);


  const showTextArea = () => {
    navigation.push(screens.TextArea, {
      value: '',
      onSubmit: (values) => {
        Alert.alert(values.value);
      },
    });
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.contentContainer}
      style={styles.scrollView}
    >
      <Button text="Modal content height" onPress={() => setVisibleModalContentHeight(true)} />

      <Button text="Modal text area" onPress={showTextArea} style={{ marginTop: 16 }} />

      <BottomSheet
        visible={visibleModalContentHeight}
        onClose={() => setVisibleModalContentHeight(false)}
      >
        <Button
          type="primary"
          size="large"
          text="Continue"
          style={{
            marginBottom: globalStyles.bottomSpacing,
            marginHorizontal: globalStyles.padding.md,
          }}
        />
      </BottomSheet>
    </ScrollView>
  );
};

export default UIKitModalWindows;
