import * as React from 'react';
import { ScrollView } from 'react-native';

import styles from '../UIKit.styles';

import AlertComponent from '/component/Alert';
import Button from '/component/Button';
import Alert from '/overlay/Alert';

const style = {
  marginBottom: 16,
};

export default () => {
  const showGeneral = () => {
    Alert.general({
      title: 'Heads up',
      description: 'You just clicked a button',
    });
  };

  const showError = () => {
    Alert.error({
      title: 'Uh oh',
      description: 'We cannot do that right now',
    });
  };

  const showSuccess = () => {
    Alert.success({
      title: 'You did it!',
      description: 'You showed an alert :)',
    });
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.contentContainer}
      style={styles.scrollView}
    >
      <AlertComponent
        title="General Alert"
        description="Nothing went wrong, I just want to show you some information"
        style={style}
        isVisible
      />
      <AlertComponent
        type="warning"
        title="Warning Alert"
        description="Something has gone terribly wrong"
        style={style}
        isVisible
      />
      <AlertComponent
        type="success"
        title="Success Alert"
        description="Something went terribly right!"
        style={style}
        isVisible
      />
      <Button text="Show Alert" style={style} onPress={showGeneral} size="small" />
      <Button text="Show Error Alert" style={style} onPress={showError} size="small" />
      <Button text="Show Success Alert" style={style} onPress={showSuccess} size="small" />
    </ScrollView>
  );
};
