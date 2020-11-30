import React from 'react';

import BaseCard from '/component/ItemCard';
import { getInputSource } from '/constants/config';
import { itemsHelper } from '/util';

const ItemCard = ({
  item, style, onPress,
}) => {
  const files = item.files || [];

  const description = getInputSource(item.custom.inputSource);
  const icon = itemsHelper.getItemIcon(item);

  return (
    <BaseCard
      style={style}
      thumbnailUrl={item.thumbnailUrl}
      file={files[0]}
      item={item}
      icon={icon}
      description={description}
      name={item.displayName}
      onPress={onPress}
      showSecondPreview={false}
    />
  );
};

export default ItemCard;
