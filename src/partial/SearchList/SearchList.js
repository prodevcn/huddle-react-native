import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, TouchableOpacity } from 'react-native';

import Text from '/component/Text';
import SearchInput from '/component/SearchInput';
import highlightMatches from './highlightMatches';

import styles from './SearchList.styles';

const SearchList = ({
  value,
  onChangeText,
  style,
  highlight = true,
  onItemPress,
  itemStyle,
  renderItem: renderItemProp,
  nameKey = 'name',
  autoFocus,
  ...rest
}) => {
  const renderItem = ({ item }) => {
    let highlightedName;
    const name = item[nameKey].trim();

    if (!(value && highlight)) {
      highlightedName = <Text.Plain key="value">{name}</Text.Plain>;
    } else {
      highlightedName = highlightMatches(name, value.replace(/ /g, ''));
    }

    // Let people override the renderItem function
    if (renderItemProp) {
      renderItemProp(highlightedName, item);
    }

    const handleItemPress = () => {
      onItemPress(item);
    };

    return (
      <TouchableOpacity style={styles.item} onPress={handleItemPress}>
        <Text>{highlightedName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.wrapper, style]}>
      <SearchInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        autoFocus={autoFocus}
      />
      <FlatList
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        renderItem={renderItem}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        {...rest}
      />
    </View>
  );
};

SearchList.propTypes = {
  onItemPress: PropTypes.func.isRequired,
};

export default SearchList;
