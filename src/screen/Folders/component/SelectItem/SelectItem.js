import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import ItemListItem from '/partial/ItemListItem';

import { actions as folderActions, selectors as foldersSelectors } from '/state/folders';

const SelectItem = ({ item }) => {
  const dispatch = useDispatch();

  const selectedItems = useSelector(foldersSelectors.selectedItemsSelector, shallowEqual);

  const isSelected = (itemId) => selectedItems.indexOf(itemId) > -1;

  const handleItemSelected = (itemId) => () => {
    if (isSelected(itemId)) {
      dispatch(folderActions.unselectItems(itemId));
    } else {
      dispatch(folderActions.selectItems(itemId));
    }
  };

  return (
    <ItemListItem
      item={item}
      hideActionSymbol
      selected={isSelected(item.docUniqueName)}
      onCheckChange={handleItemSelected(item.docUniqueName)}
      onPress={handleItemSelected(item.docUniqueName)}
    />
  );
};

export default SelectItem;
