import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '/api';
import useDebounce from '/hook/useDebounce';
import SearchList from '/partial/SearchList';
import { selectors as profileSelectors } from '/state/profiles';
import { actions as itemsActions } from '/state/items';

const NAME_KEY = 'presName';
const ID_KEY = 'fdbMedId';

const PickMedication = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileCode = useSelector(profileSelectors.currentProfileCodeSelector);
  const initialValue = navigation.getParam('initialValue') || '';
  const [value, setValue] = useState(initialValue);
  const [items, setItems] = useState([]);
  const debouncedSearch = useDebounce(value, 250);
  const onChange = navigation.getParam('onChange');

  const keyExtractor = ({ [ID_KEY]: id }) => `item-${id}`;

  useEffect(() => {
    const fetchItems = async () => {
      const result = await api.tool.medsearch(profileCode, debouncedSearch);

      setItems(result.medSearchInfoList);
    };

    if (debouncedSearch === '') {
      setItems(''); // clear results
    } else {
      fetchItems();
    }
  }, [debouncedSearch]);

  const handleItemPress = (item) => {
    if (onChange) {
      dispatch(itemsActions.saveSelectedMedication(item[ID_KEY]));
      onChange(item && item[NAME_KEY]);
    }

    navigation.pop();
  };

  return (
    <SearchList
      highlight={false}
      data={items}
      value={value}
      onChangeText={setValue}
      keyExtractor={keyExtractor}
      onItemPress={handleItemPress}
      extraData={value}
      nameKey={NAME_KEY}
      autoFocus
    />
  );
};

PickMedication.navigationOptions = {
  title: 'Select Medication',
};

export default PickMedication;
