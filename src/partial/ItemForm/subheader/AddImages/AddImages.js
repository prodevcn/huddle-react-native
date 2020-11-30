// todo toadums this component name and wording within should be changed from image -> document
import React from 'react';
import { ScrollView } from 'react-native';

import Image, { AddImage } from '/partial/ItemForm/component/Image';
import Document from '/component/Document';

import styles from './AddImages.styles';

const getKey = (item) => item.docUniqueName || item.uploadId;

const AddImages = ({ docs, handleItemAdded, handleItemRemoved }) => (
  <ScrollView
    style={styles.header}
    contentContainerStyle={styles.headerContent}
    horizontal
  >
    <AddImage onPress={handleItemAdded} />

    {!!docs.length && docs.map((item, i) => {
      if (item.mimeType && item.mimeType.match(/image/i)) {
        return (
          <Image
            data={item}
            key={getKey(item)}
            // Pass in both docUniqueName and uploadId so that we can remove an image whether
            // it already exists on the item on the API **or** is only front-end (not yet uploaded)
            onRemove={() => handleItemRemoved(i, item.docUniqueName, item.uploadId)}
            style={styles.image}
          />
        );
      }

      return (
        <Document document={item} key={getKey(item)} style={styles.image} />
      );
    })}
  </ScrollView>
);

export default AddImages;
