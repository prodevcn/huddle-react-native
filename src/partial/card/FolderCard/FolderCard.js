/* eslint-disable no-continue, no-plusplus */

import React from 'react';

import ItemCard from '/component/ItemCard';

const HorizontalFolderList = ({
  items, style, folder, onPress,
}) => {
  let thumbnailUrl;
  let file;
  const firstFile = items[folder.docUniqueName[0]];

  // Find the first thumbnail if one exists, otherwise we will
  // grab the first non-image file
  for (let i = 0; i < folder.docUniqueName.length; i++) {
    const docId = folder.docUniqueName[i];
    const item = items[docId];

    if (!item) continue;

    const withThumbnail = item.files.find((f) => f.thumbnailUrl);

    // If there is a thumbnail immediately bail out of the loop and we will use that
    if (withThumbnail) {
      thumbnailUrl = withThumbnail.thumbnailUrl;
      break;
    }

    // In the case where there isn't a thumbnail, we will use the first file as our preview
    if (!file && item.files.length) {
      [file] = item.files;
    }
  }

  const description = `${folder.docUniqueName.length} Items`;

  return (
    <ItemCard
      style={style}
      thumbnailUrl={thumbnailUrl}
      file={file}
      item={firstFile}
      icon="Folder"
      description={description}
      name={folder.displayName}
      onPress={onPress}
    />
  );
};

export default HorizontalFolderList;
