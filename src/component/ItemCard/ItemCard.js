/* eslint-disable no-continue, no-plusplus */

import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Text from '/component/Text';
import DetailedIcon from '/component/DetailedIcon';
import { getIconName } from '/component/Document';
import { getFields } from '/screen/Item/Item';


import styles from './ItemCard.styles';
import globalStyles from '/styles';

import useTimeout from '/hook/useTimeout';

const ItemCard = ({
  thumbnailUrl,
  file,
  item,
  style,
  onPress,
  icon,
  name,
  description,
  showSecondPreview = true,
}) => {
  const getPreview = () => {
    let child = <View style={styles.preview} />;

    if (thumbnailUrl) {
      child = (
        <View style={styles.preview}>
          <Image source={{ uri: thumbnailUrl }} style={styles.previewImage} />
        </View>
      );
    } else if (file) {
      const fileIcon = getIconName(file.mimeType);
      child = (
        <View style={[styles.preview, styles.previewDocument]}>
          <FAIcon name={fileIcon} size={32} color={globalStyles.palette.deepBlue} />
        </View>
      );
    } else if (item) {
      // If this item doesn't have an attachment we will render a "fake document" of
      // the fields in the item
      const fields = getFields(item).map((field) => {
        const value = item[field.key] || item.custom[field.key];
        if (!value) return null;

        return (
          <View style={styles.previewTextField} key={field.key}>
            <Text fontSize={8} lineHeight={10} weight="medium">{field.label}</Text>
            <Text fontSize={8} lineHeight={10} color="medium">{value}</Text>
          </View>
        );
      });

      child = (
        <View style={[styles.preview, styles.previewText]}>
          <Text.H5 fontSize={10} lineHeight={12} style={styles.previewTextHeader}>
            {item.displayName}
          </Text.H5>
          {fields}
        </View>
      );
    }

    // Render the preview. We add the second preview which is another little card
    // that peeks out to the right of the main preview, to make it look like a folder
    return (
      <>
        {!!showSecondPreview && (
          <View style={[styles.preview, styles.secondPreview]} />
        )}
        {child}
      </>
    );
  };

  let Icon;
  if (icon && DetailedIcon[icon]) {
    Icon = DetailedIcon[icon];
  } else {
    Icon = DetailedIcon.Other;
  }

  const WrapperComponent = onPress ? TouchableOpacity : View;
  const handlePress = useTimeout(onPress);

  return (
    <WrapperComponent style={[styles.card, style]} onPress={handlePress}>
      <View style={styles.previewWrapper} pointerEvents="none">
        {getPreview()}
      </View>
      <View style={styles.footer}>
        <Icon />
        <View style={styles.footerText}>
          <Text.H5 numberOfLines={1}>{name}</Text.H5>
          <Text.BodySmall color="medium" numberOfLines={1}>
            {description}
          </Text.BodySmall>
        </View>
      </View>
    </WrapperComponent>
  );
};

export default ItemCard;
