import React from 'react';
import get from 'lodash/get';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import api from '/api';
import Alert from '/overlay/Alert';
import ItemForm from '/partial/ItemForm';
import HeaderButton from '/navigation/header/HeaderButton';
import { itemsHelper } from '/util';
import * as events from '/constants/events/Items/editItem';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import confirmBack from '/util/confirmBack';

import {
  actions as itemActions,
  selectors as itemSelectors,
} from '/state/items';

const EditItem = ({ navigation }) => {
  const itemId = navigation.getParam('itemId');
  const initialItem = useSelector(itemSelectors.itemsHashSelector, shallowEqual)[itemId];
  const defaultType = get(initialItem, 'custom.type', '');
  const dispatch = useDispatch();

  const onSubmit = async (data, images, formActions) => {
    dispatch(trackEvent(events.CLICK_UPDATE_ITEM));
    try {
      const item = itemsHelper.merge(initialItem, data);

      // The API is requiring this field for update (but not for upload)
      if (!item.note) {
        item.note = '';
      }

      await dispatch(itemActions.updateItem(item, images));
      navigation.pop();

      let message = api.userMessages.updateDocument.success;

      if (images.add && images.add.length) {
        message = api.userMessages.updateDocument.successWithUpload;
      }

      Alert.success(message);
    } catch (e) {
      Alert.error(api.userMessages.updateDocument.failed);
    }

    formActions.setSubmitting(false);
  };

  return (
    <ItemForm
      initialType={defaultType}
      initialValues={initialItem}
      initialImages={initialItem && initialItem.files}
      onSubmit={onSubmit}
      navigation={navigation}
      buttonText="Update Item"
      isEdit
    />
  );
};

EditItem.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <HeaderButton icon="back" onPress={confirmBack(navigation)} />,
});

export default EditItem;
