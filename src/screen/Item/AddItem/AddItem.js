import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '/navigation/header/HeaderButton';
import NavigationService from '/navigation/NavigationService';

import api from '/api';
import Alert from '/overlay/Alert';
import ItemForm from '/partial/ItemForm';
import { selectors } from '/state/profiles';
import confirmBack from '/util/confirmBack';

import { actions } from '/state/items';
import globalStyles from '/styles';

import screens from '/screen';

const getHeaderStyle = ({ navigationOptions }) => ({
  headerStyle: {
    ...navigationOptions.headerStyle,
    backgroundColor: globalStyles.palette.grey04,
  },
});

const AddItem = ({ navigation }) => {
  const dispatch = useDispatch();
  const readOnlyActiveProfile = useSelector(selectors.readOnlyActiveProfileSelector);
  const showPickType = navigation.getParam('showPickType');

  useEffect(() => {
    if (readOnlyActiveProfile) {
      Alert.error(api.userMessages.upload.readOnlyActiveProfile);
      navigation.pop();
    }
  }, [readOnlyActiveProfile]);

  const initialImages = navigation.getParam('initialImages'); // eg Scan Insurance Card
  const initialType = navigation.getParam('initialType'); // eg Health Summary
  const hideTypeField = navigation.getParam('hideTypeField');
  const initialValues = navigation.getParam('initialValues'); // eg Scan Insurance Card
  const passNavigation = navigation.getParam('navigation') || navigation;
  const onItemAdded = navigation.getParam('onItemAdded');
  const shouldPop = navigation.getParam('shouldPop');
  const generateName = navigation.getParam('generateName');
  const gotoItemTab = navigation.getParam('gotoItemTab');

  const onSubmit = async (data, images, formActions) => {
    try {
      const { profileCode, ...values } = data;
      const itemId = await dispatch(actions.uploadItem(values, images, profileCode));
      if (gotoItemTab) {
        navigation.navigate(screens.Items);
      }
      // Sometimes we want to pop, not dismiss
      if (shouldPop) {
        navigation.pop();
      } else {
        navigation.dismiss();
      }

      let duration;
      let message = api.userMessages.upload.success;

      if (images.add && images.add.length) {
        duration = 5000;
        message = api.userMessages.upload.successWithUpload;
      }

      if (onItemAdded) {
        onItemAdded(itemId);
      }

      Alert.success(message, {
        duration,
        onPress: () => {
          NavigationService.navigate(screens.Item, { itemId });
        },
      });
    } catch (e) {
      Alert.error(api.userMessages.upload.failed);
    }
    formActions.setSubmitting(false);
  };

  return (
    <ItemForm
      initialImages={initialImages}
      initialType={initialType}
      hideTypeField={hideTypeField}
      initialValues={initialValues}
      onSubmit={onSubmit}
      navigation={passNavigation}
      generateName={generateName}
      showPickType={showPickType}
      showProfilePicker
    />
  );
};

AddItem.navigationOptions = ({ navigation, navigationOptions }) => {
  const hideNav = navigation.getParam('hideNav') === true;
  // Hide nav header (ie Health Summary - Review Insurance)
  if (hideNav) {
    return {
      header: null,
    };
  }

  // No stack found, so display back button
  // The AddItem screen will be the root of the stack so we need to add a back button manually
  return {
    headerLeft: () => <HeaderButton icon="back" onPress={confirmBack(navigation)} />,
    ...getHeaderStyle({ navigationOptions }),
  };
};

export default AddItem;
