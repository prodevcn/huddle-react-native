import React from 'react';
import { Image as RNImage, View, TouchableOpacity } from 'react-native';

import Text from '/component/Text';
import Icon from '/component/Icon';
import ItemListItem from '/partial/ItemListItem';

import security from 'assets/illustrations/security.png';

import styles from './ItemPreview.styles';
import globalStyles from '/styles';

import screens from '/screen';

const ItemPreview = ({ items, determiner, navigation }) => {
  const handleViewAllPress = () => {
    navigation.navigate(screens.Items);
  };

  const handleItemPress = (item) => () => {
    navigation.push(screens.ItemStack, { itemId: item.docUniqueName });
  };

  if (!items.length) {
    return (
      <View style={styles.emptyWrapper}>
        <View style={styles.textWrapper}>
          <Text.H3 color="white">Welcome to Huddle</Text.H3>
          <Text color="white" style={[styles.emptyText, styles.topParagraph]}>
            We&apos;re here to make it easier to manage medical documents.
          </Text>
          <Text color="white" style={styles.emptyText}>
            Get started by tapping any card above.
          </Text>
        </View>
        <RNImage source={security} style={styles.securityImage} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.itemHeader}>
        <Text.H3>{determiner} items</Text.H3>
        <TouchableOpacity
          style={styles.viewAll}
          onPress={handleViewAllPress}
        >
          <Text color="medium" style={styles.viewAllText}>View all</Text>
          <Icon name="chevron-right" color={globalStyles.palette.grey01} size={16} />
        </TouchableOpacity>
      </View>

      {items.map((item) => (
        <ItemListItem
          key={item.docUniqueName}
          onPress={handleItemPress(item)}
          item={item}
        />
      ))}

      <Text.Label weight="medium" style={styles.hint}>
        View all items in the items tab
      </Text.Label>
    </View>
  );
};

export default ItemPreview;
