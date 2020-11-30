import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import values from 'lodash/values';

import HeaderButton from '/navigation/header/HeaderButton';
import Text from '/component/Text';
import ListItem from '/component/ListItem';
import Button from '/component/Button';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import {
  selectors as itemsSelectors,
  actions as itemsActions,
} from '/state/items';
import { selectors as profileSelectors } from '/state/profiles';

import styles from './SelectMedication.styles';

import screens from '/screen';

const SelectMedication = ({ navigation }) => {
  const dispatch = useDispatch();
  const linkImports = useSelector(itemsSelectors.linkImportsSelector);
  const loadingImport = useSelector(itemsSelectors.loadingImportSelector);
  const activeProfile = useSelector(profileSelectors.activeProfileSelector);
  const [selected, setSelected] = useState({});

  const selectInitial = (items) => {
    const initialSelected = {};
    items.forEach((item) => {
      initialSelected[item.medicationId] = true;
    });
    setSelected(initialSelected);
  };

  const fetchItems = async () => {
    const items = await dispatch(itemsActions.fetchLinkImports(activeProfile));
    selectInitial(items);
  };

  useEffect(() => {
    // We only want to fetch link imports once
    if (!linkImports) {
      fetchItems();
    } else {
      // linkImports already fetched previously. set state to selected.
      selectInitial(linkImports);
    }
  }, []);

  const handleCheckChange = (itemId) => () => {
    setSelected({
      ...selected,
      [itemId]: !selected[itemId],
    });
  };

  const handleSkipPress = () => {
    navigation.push(screens.ConfirmMedication, {
      itemsToAdd: [],
    });
  };

  const handleContinuePress = () => {
    navigation.push(screens.ConfirmMedication, {
      // Find which items are selected
      itemsToAdd: linkImports.filter((item) => selected[item.medicationId]),
    });
  };

  const skipButton = (
    <Button
      type="ghost"
      text="I'm not taking any of these"
      onPress={handleSkipPress}
      size="large"
      key="skip"
    />
  );

  const continueButton = (
    <Button
      text="Continue"
      disabled={!values(selected).find((sel) => sel)}
      style={styles.continue}
      size="large"
      key="continue"
      onPress={handleContinuePress}
    />
  );

  const handleRenderItem = ({ item }) => (
    // The checkbox animation is enough feedback imo. I don't like the look of the
    // TouchableOpacity when the action is to select the checkbox
    <TouchableWithoutFeedback onPress={handleCheckChange(item.medicationId)}>
      <View>
        <ListItem
          icon="Medication"
          selected={!!selected[item.medicationId]}
          label={item.filename}
          onCheckChange={handleCheckChange(item.medicationId)}
          actionSymbolName="none"
          description="Imported"
          squarePreview
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <BottomButtonLayout
      control={[continueButton, skipButton]}
      ScrollComponent={FlatList}
      data={linkImports}
      keyExtractor={(item) => item.medicationId}
      renderItem={handleRenderItem}
      // A user coming from Link will always have items, so it is safe to
      // render the activity indicator while there are no results
      ListEmptyComponent={loadingImport && <ActivityIndicator style={styles.loading} />}
      ListHeaderComponent={(
        <View style={styles.header}>
          <Text.H2>
            Confirm medications to add to Huddle
          </Text.H2>
          <Text color="medium" style={styles.subtitle}>
            Next we&apos;ll let you add more medication, so Huddle
            can be the ultimate source of truth for current
            and past medications.
          </Text>
        </View>
      )}
    />
  );
};

SelectMedication.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <HeaderButton
      onPress={() => navigation.dismiss()}
      icon="back"
    />
  ),
});

export default SelectMedication;
