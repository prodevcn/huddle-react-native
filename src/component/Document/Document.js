import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import { withNavigation } from 'react-navigation';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

import Alert from '/overlay/Alert';
import Text from '/component/Text';
import Progress from '/component/Progress';
import api from '/api';
import getIconName from './getIconName';

import globalStyles from '/styles';
import styles from './Document.styles';
import fsConstants from '/constants/fs';
import offlineMode from '/util/offlineMode';

import { styles as addImageStyles } from '/partial/ItemForm/component/Image';

const FileIcon = ({
  document,
  style,
  iconSize = 24,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { mimeType = '' } = document;
  const name = document.displayName || document.filename;

  const icon = getIconName(mimeType);

  const handlePress = async () => {
    // We want to save files as the same name they were uploaded with, otherwise
    // rn-fetch-blob will just name them a random string like `RNFetchBlob928j393_sjdl`
    // without a file extension.
    // !! Note: You need to provide a file extension for the file to open
    const path = `${fsConstants.directories.cache}/${name}`;

    // if the file exists we don't need to download it again
    const fileExists = await RNFS.exists(path);

    if (!fileExists) {
      // The file isn't saved locally, so the user must be connected to the internet to download
      if (offlineMode.isOffline) {
        Alert.error(api.userMessages.offline.fileNotSavedLocally);
        return;
      }

      // Get a pre-signed S3 url to download the file
      const uri = await api.document.download(document.docUniqueName);

      setDownloading(true);
      try {
        await RNFetchBlob
          .config({ path })
          .fetch('GET', uri)
          .progress((received, total) => {
            setProgress(received / total);
          });

        setProgress(100);
      } catch (e) {
        Alert.error(api.userMessages.downloadDoc.error, {
          onPress: handlePress,
        });
      }
    }

    try {
      await FileViewer.open(path);
    } catch (e) {
      Alert.error(api.userMessages.document.cannotOpen);
    }
  };

  return (
    <TouchableOpacity
      style={[addImageStyles.card, style]}
      onPress={handlePress}
    >
      <View style={[styles.iconWrapper]}>
        <FAIcon
          size={iconSize}
          color={globalStyles.palette.deepBlue}
          name={icon}
          style={styles.icon}
        />
      </View>

      <Text.Label
        weight="medium"
        ellipsizeMode="middle"
        numberOfLines={2}
        style={styles.name}
      >
        {name}
      </Text.Label>
      {!!downloading && (
        <Progress progress={progress} style={styles.progress} />
      )}
    </TouchableOpacity>
  );
};

export default withNavigation(FileIcon);
