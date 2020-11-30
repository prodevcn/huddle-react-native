import React, { useState, useEffect } from 'react';
import { View, SectionList } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import groupBy from 'lodash/groupBy';
import keys from 'lodash/keys';

import ItemListItem from '/partial/ItemListItem';
import Text from '/component/Text';
import EmptyList from '/partial/EmptyList';

import { selectors as profileSelectors } from '/state/profiles';
import { actions, selectors as itemSelectors } from '/state/items';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { format } from '/util';
import redactor from '/util/redactor';

import styles from './ItemList.styles';

import screens from '/screen';

export const SectionHeader = ({ title }) => (
  <Text.H5 color="light" style={styles.dateHeader}>
    {title}
  </Text.H5>
);

export const SectionFooter = () => <View style={styles.sectionFooter} />;

export const groupByDate = (items) => {
  const grouped = groupBy(items, (item) => format.toRelativeDate(item.createTimestamp));
  const data = keys(grouped).map((groupName) => ({ title: groupName, data: grouped[groupName] }));

  return data;
};

const ItemList = ({
  navigation,
  searchTerm,
  filterType,
  screenName,
  ListEmptyComponent,
  ListHeaderComponent,
  additionalFilter,
}) => {
  const dispatch = useDispatch();

  const activeProfile = useSelector(profileSelectors.activeProfileSelector, shallowEqual);
  const items = useSelector(itemSelectors.itemsSelector, shallowEqual);
  const fetching = useSelector(itemSelectors.fetchingItemsSelector, shallowEqual);
  const [initialLoad, setInitialLoad] = useState(true);

  // When the app loads or when the active profile changes query the item list
  useEffect(() => {
    const preload = async () => {
      // We don't want to show the empty text, so keep track of when we are loading
      setInitialLoad(true);
      await dispatch(actions.fetchItems(false, activeProfile.profileCode));
      setInitialLoad(false);
    };

    preload();
  }, [activeProfile.profileCode]);

  if (!activeProfile) {
    return null;
  }

  const handleOnPress = (item) => () => {
    dispatch(trackEvent(`${screenName}: Click view item`));
    navigation.push(screens.ItemStack, { itemId: item.docUniqueName });
  };

  const handleRefresh = async () => {
    await dispatch(actions.fetchItems(true, activeProfile.profileCode));
  };

  let currentItems = [];
  if (filterType) {
    currentItems = items.filter((doc) => doc.custom.type.match(filterType));
  } else {
    currentItems = items.filter((doc) => redactor(doc.displayName).test(searchTerm, 'i'));
  }

  // Allow the caller to provide additional filters
  if (additionalFilter) {
    currentItems = currentItems.filter(additionalFilter);
  }

  const data = groupByDate(currentItems);

  let emptyText;
  if (!initialLoad) {
    if (searchTerm) {
      emptyText = 'Sorry, we couldn\'t find any items that matched your search';
    } else {
      emptyText = 'It’s looking a little empty in here, add an item by selecting “Add Items” below';
    }
  }

  let emptyComponent = ListEmptyComponent;

  if (!ListEmptyComponent && emptyText) {
    emptyComponent = (
      <EmptyList>{emptyText}</EmptyList>
    );
  }

  return (
    <SectionList
      sections={data}
      keyExtractor={(item) => item.docUniqueName}
      ListEmptyComponent={emptyComponent}
      onRefresh={handleRefresh}
      refreshing={fetching}
      renderItem={({ item }) => (
        <ItemListItem
          item={item}
          onPress={handleOnPress(item)}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeader title={title} />
      )}
      renderSectionFooter={SectionFooter}
      // ScrollView inherited
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default ItemList;
