import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import Alert from '/overlay/Alert';
import Button from '/component/Button';
import BottomSheet from '/component/BottomSheet';
import Text from '/component/Text';

import { actions } from '/state/overlays';

import styles from './ConfirmDialog.styles';

const ConfirmDialog = ({
  animation,
  title,
  description,
  confirmButtonTitle = 'Delete',
  onPress: handleOnPress,
  successMessage,
  errorMessage,
  handleError,
}) => {
  const dispatch = useDispatch();
  const alertSuccess = () => {
    dispatch(actions.dismiss());
    if (successMessage) {
      Alert.success(successMessage);
    }
  };

  const alertError = (error) => {
    dispatch(actions.dismiss());
    if (handleError) {
      handleError(error);
    } else if (errorMessage) {
      Alert.error(errorMessage);
    }
  };

  const handleDeletePress = async () => {
    try {
      await handleOnPress();
      alertSuccess();
    } catch (error) {
      alertError(error);
    }
  };

  const handleCancelPress = () => dispatch(actions.dismiss());

  return (
    <BottomSheet animation={animation}>
      <View style={styles.box}>
        {!!title && (
          <Text.H3>{title}</Text.H3>
        )}

        {!!description && (
          <Text style={styles.text}>{description}</Text>
        )}
      </View>

      <View
        style={styles.buttonBox}
        testID="confirm-dialog"
      >
        <Button
          text="Cancel"
          type="ghost"
          onPress={handleCancelPress}
          style={[styles.button, styles.buttonLeft]}
        />
        <Button
          text={confirmButtonTitle}
          type="danger"
          onPress={handleDeletePress}
          style={styles.button}
          testID={confirmButtonTitle}
        />
      </View>
    </BottomSheet>
  );
};

export default ConfirmDialog;
