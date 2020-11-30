import React from 'react';
import { Image as RNImage } from 'react-native';

import DetailedIcon from '/component/DetailedIcon';
import ListItem from '/component/ListItem';

import { getInputSource } from '/constants/config';
import { itemsHelper } from '/util';
import useThumbnailDownload from '/hook/useThumbnailDownload';

import styles from './ItemListItem.styles';

const ItemListItem = ({
  item,
  icon,
  onPress,
  checkboxStyle,
  ...listItemProps
}) => {
  const {
    tempThumbnailUri,
    thumbnailFetchFailed,
    fetchThumbnail,
  } = useThumbnailDownload(item.thumbnailDocUniqueName);

  const getIcon = () => {
    // Did we get an icon passed in?
    if (icon && DetailedIcon[icon]) {
      return icon;
    }

    return itemsHelper.getItemIcon(item);
  };

  let handleOnPress;

  // We want to pass undefined into the ListItem if `props.onPress` is not defined
  if (onPress) {
    handleOnPress = () => onPress(item);
  }

  let preview;

  const thumbnailUri = tempThumbnailUri || item.thumbnailUrl;

  // If the thumbnail fetch fails a second time we won't try to show an image,
  // and will instead just show the item icon
  if (thumbnailUri && !thumbnailFetchFailed) {
    // Change the key when we get a tempUri to cause the image to refresh
    preview = (
      <RNImage
        key={tempThumbnailUri || 'thumbnail'}
        style={styles.image}
        source={{ uri: thumbnailUri }}
        onError={fetchThumbnail}
      />
    );
  }

  return (
    <ListItem
      squarePreview
      preview={preview}
      icon={getIcon()}
      label={item.displayName}
      description={getInputSource(item.custom.inputSource)}
      onPress={handleOnPress}
      checkboxStyle={[styles.checkboxStyle, checkboxStyle]}
      {...listItemProps}
    />
  );
};


export default ItemListItem;
