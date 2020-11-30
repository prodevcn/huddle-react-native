import React from 'react';
import { InteractionManager, FlatList, View } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import formatDate from 'date-fns/format';
import keys from 'lodash/keys';

import Avatar from '/component/Avatar';
import HeaderButton from '/navigation/header/HeaderButton';
import ListItem from '/component/ListItem';
import EmptyList from '/partial/EmptyList';
import Text from '/component/Text';
import { getHumanAge } from '/util/getHumanAge';
import globalStyles from '/styles';
import * as events from '/constants/events/HealthSummary/homeScreen';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import screens from '/screen';
import { selectors } from '/state/profiles';
import { UseLightStatusBar } from '/util/statusBar';
import { NavigationInteractions } from '/util/interactionManager';
import format from '/util/format';
import { selectors as itemSelectors } from '/state/items';
import styles from './HealthSummary.styles';
import { pages } from '/screen/Health/HealthCategory';
import offlineMode from '/util/offlineMode';

const getDateString = (activeProfile) => {
  const date = format.APIDateToDate(activeProfile.dob);
  const age = getHumanAge(activeProfile.dob);

  return `${formatDate(date, 'MMMM dd, yyyy')} (${age})`;
};

const HealthSummary = ({ navigation }) => {
  const activeProfile = useSelector(selectors.activeProfileSelector);
  const readOnlyActiveProfile = useSelector(selectors.readOnlyActiveProfileSelector);
  const dispatch = useDispatch();
  const items = useSelector(itemSelectors.itemsSelector, shallowEqual);

  if (!activeProfile) {
    return null;
  }

  const handlePagePress = (type, hasItem) => () => {
    const page = pages[type];
    // Go to the HealthCategory page if the category has items
    if (hasItem) {
      dispatch(trackEvent(events.CLICK_VIEW(type)));
      navigation.push(screens.HealthCategory, { type });
    } else {
      if (offlineMode.isOffline) {
        offlineMode.showOfflineAlert();
        return;
      }

      dispatch(trackEvent(events.CLICK_ADD(type)));
      // If the config has an add event, go to that screen (such as AddInsurance).
      // Otherwise show the normal AddItemStack
      const screen = page.addScreen ? page.addScreen : screens.AddItemStack;

      navigation.push(screen, {
        initialType: type,
        hideTypeField: true,
        initialValues: page.initialValues,
        shouldPop: true,
        onItemAdded: () => {
          InteractionManager.runAfterInteractions(() => {
            navigation.push(screens.HealthCategory, { type });
          });
        },
      });
    }
  };

  const renderItem = ({ item: type }) => {
    const page = pages[type];

    // Is there an item that matches this category?
    const hasItem = !!items.find((item) => item.custom.type === type);

    // If there are no items and the user doesn't have write access dont show the item
    if (!hasItem && readOnlyActiveProfile) {
      return null;
    }

    return (
      <ListItem
        key={type}
        icon={page.iconName}
        label={page.heading}
        squarePreview
        actionSymbolColor="teal"
        actionSymbolName={hasItem ? null : 'plus'}
        onPress={handlePagePress(type, hasItem)}
      />
    );
  };

  const getKey = (item) => item;

  // Note: we are using NavigationInteractions here to get the correct
  // behaviour with UseLightStatusBar
  return (
    <>
      <NavigationInteractions />
      <UseLightStatusBar />
      <View style={styles.bg}>
        <Avatar profile={activeProfile} style={styles.avatar} size="medium" />
        <Text.H1 color="white" style={styles.h1}>
          {activeProfile.firstName}
          {' '}
          {activeProfile.lastName}
        </Text.H1>
        {activeProfile.dob && (
          <Text color="white" style={styles.dob}>
            {getDateString(activeProfile)}
          </Text>
        )}
      </View>
      <FlatList
        data={keys(pages)}
        renderItem={renderItem}
        keyExtractor={getKey}
        ListEmptyComponent={(
          <EmptyList textStyle={styles.emptyList}>
            It’s looking a little empty in here
          </EmptyList>
        )}
      />
    </>
  );
};

HealthSummary.navigationOptions = ({ navigation, navigationOptions }) => ({
  headerStyle: {
    ...navigationOptions.headerStyle,
    backgroundColor: globalStyles.palette.coral,
  },
  headerLeft: () => (
    <HeaderButton
      onPress={() => navigation.dismiss()}
      color={globalStyles.palette.white}
      icon="back"
    />
  ),
});

export default HealthSummary;
