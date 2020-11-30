import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import DetailedIcon from '/component/DetailedIcon';
import ItemList from '/partial/ItemList';
import Text from '/component/Text';
import BackgroundExtension from '/component/BackgroundExtension';
import AddButton from '/partial/AddButton';

import styles from './HealthItems.styles';
import { selectors } from '/state/profiles';

const HealthItems = ({
  heading,
  addText,
  iconName,
  initialType,
  navigation,
  screenName,
  onAddPress,
  additionalFilter,
}) => {
  const activeProfile = useSelector(selectors.activeProfileSelector);
  const readOnlyActiveProfile = useSelector(selectors.readOnlyActiveProfileSelector);

  if (!activeProfile) {
    return null;
  }

  const Icon = DetailedIcon[iconName];

  return (
    <View style={{ flex: 1 }}>
      <BackgroundExtension />

      <View style={styles.bg}>
        <Icon style={styles.icon} />
        <Text.H2 style={styles.heading}>{heading}</Text.H2>
      </View>

      {!readOnlyActiveProfile && (
        <AddButton
          text={addText}
          onPress={onAddPress}
          style={styles.add}
        />
      )}

      <ItemList
        navigation={navigation}
        filterType={initialType}
        additionalFilter={additionalFilter}
        screenName={screenName}
      />
    </View>
  );
};

export default HealthItems;
