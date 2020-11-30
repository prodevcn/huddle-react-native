import React, { useState } from 'react';
import keys from 'lodash/keys';

import screens from '/screen';
import SearchList from '/partial/SearchList';
import itemTypes, { itemTypeLabels } from './itemTypes';
import redactor from '/util/redactor';

const PickType = ({ navigation }) => {
  const [value, setValue] = useState('');
  const onChange = navigation.getParam('onChange');

  const keyExtractor = ({ id }) => `item-${id}`;

  const items = keys(itemTypeLabels).map((key) => ({
    name: itemTypeLabels[key],
    id: key,
  }));

  const handleItemPress = (item) => {
    if (item.id === itemTypes.insurance) {
      navigation.push(screens.AddInsuranceCard);
    } else if (onChange) {
      onChange(item && item.id);
      navigation.pop();
    } else {
      navigation.pop();
    }
  };

  const data = items.filter((item) => redactor(item.name).test(value, 'i'));

  return (
    <SearchList
      data={data}
      value={value}
      onChangeText={setValue}
      keyExtractor={keyExtractor}
      extraData={value}
      onItemPress={handleItemPress}
    />
  );
};

PickType.navigationOptions = {
  title: 'Add an Item Type',
};

export default PickType;
