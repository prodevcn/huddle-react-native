import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList } from 'react-native';
import isString from 'lodash/isString';

import Text from '/component/Text';
import ItemListItem from '/partial/ItemListItem';
import Button from '/component/Button';
import AddButton from '/partial/AddButton';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';

import styles from './ConfirmMedication.styles';

import screens from '/screen';
import { itemTypes } from '/screen/Item/PickType';
import { selectors } from '/state/profiles';
import { actions as itemsActions, selectors as itemsSelectors } from '/state/items';
import { actions as tutorialActions } from '/state/tutorial';

import {
  TUTORIALS,
  STATES,
} from '/tutorial/constants';

const ConfirmMedication = ({ navigation }) => {
  const itemsToAdd = navigation.getParam('itemsToAdd') || [];

  const [addedItems, changeAddedItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const activeProfile = useSelector(selectors.activeProfileSelector);
  const isMaster = useSelector(selectors.activeProfileIsMasterSelector);
  const itemsHash = useSelector(itemsSelectors.itemsHashSelector);

  const name = isMaster ? 'you' : activeProfile.firstName;
  const title = `Add any additional medication for ${name}`;

  const handleAdd = () => {
    navigation.push(screens.AddItem, {
      shouldPop: true,
      hideTypeField: true,
      initialType: itemTypes.medication,
      onItemAdded: (itemId) => {
        changeAddedItems([
          itemId,
          ...addedItems,
        ]);
      },
    });
  };

  const handleContinuePress = async () => {
    setSubmitting(true);
    const uploadItem = (item) => dispatch(itemsActions.uploadItem(item));

    // Remove all items that we do not want
    await Promise.all(itemsToAdd.map(uploadItem));

    dispatch(tutorialActions.changeUnread(
      TUTORIALS.reviewMedication,
      STATES.completed,
    ));

    setSubmitting(false);
    navigation.dismiss();
  };

  const handleRenderItem = ({ item }) => {
    // When we add a new item from this screen we will store it's id in the
    // `addedItems` array. Items that we get from the selection screen will
    // be item objects. Grab any added items from redux
    const itemObject = isString(item) ? itemsHash[item] : item;

    if (!itemObject) return null;

    return (
      <ItemListItem
        item={itemObject}
        actionSymbolName="none"
      />
    );
  };

  const continueButton = (
    <Button
      text="Confirm & Finish"
      size="large"
      onPress={handleContinuePress}
      loading={submitting}
    />
  );

  const getKey = (item) => {
    if (isString(item)) {
      return item;
    }

    return item.docUniqueName;
  };

  return (
    <BottomButtonLayout
      control={continueButton}
      ScrollComponent={FlatList}
      data={[...addedItems, ...itemsToAdd]}
      keyExtractor={getKey}
      renderItem={handleRenderItem}
      ListHeaderComponent={(
        <View style={styles.header}>
          <Text.H2>{title}</Text.H2>
          <Text color="medium" style={styles.subtitle}>
            A medication list on Huddle is only a tap away in case
            of emergencies or to share with doctors and caregivers.
          </Text>
          <AddButton
            style={styles.add}
            text="Add a new medication"
            onPress={handleAdd}
          />
        </View>
      )}
    />
  );
};

export default ConfirmMedication;
