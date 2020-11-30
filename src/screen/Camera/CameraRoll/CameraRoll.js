import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  PermissionsAndroid,
  InteractionManager,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Image as RNImage,
} from 'react-native';

import RNCameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
import AskPermission from '/partial/AskPermission';

import Icon from '/component/Icon';

import styles from './CameraRoll.styles';
import sharedStyles from '/screen/Camera/Camera.styles';

const { width } = Dimensions.get('window');

const checkAndroidPermission = async () => {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    await PermissionsAndroid.request(permission);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};

const CameraRoll = ({ onSelect, switchPage, dismiss }) => {
  const [nextStart, setNextStart] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [needsPermission, setNeedsPermission] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPhotos = async (next) => {
    setNextStart(null);

    if (Platform.OS === 'android') {
      await checkAndroidPermission();
    }

    try {
      // GraphQL cursor style pagination with edges and notes
      const res = await RNCameraRoll.getPhotos({
        first: 30,
        after: next,
      });

      // If there are more photos we will set the last photo in the current
      // batch, and use that as the start for the next call
      if (res.page_info.has_next_page) {
        setNextStart(res.page_info.end_cursor);
      }

      setPhotos([
        ...photos,
        ...res.edges.map((edge) => edge.node.image),
      ]);
    } catch (e) {
      // User declined permission
      if (e.code === 'E_PHOTO_LIBRARY_AUTH_DENIED') {
        setNeedsPermission(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Wait til the stack is visible before fetching to prevent jank
    InteractionManager.runAfterInteractions(() => {
      getPhotos();
    });
  }, []);

  const handleSelect = (item) => () => {
    onSelect(item);
  };

  const handleShowSettingsPress = () => {
    Linking.openSettings();
  };

  const handlePermissionCancel = () => {
    dismiss();
  };

  const showFolders = async () => {
    try {
      // Show the image picker here so that we can access remote images
      // on Android. They already did the hard work for us.
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });

      onSelect({
        ...image,
        uri: image.path,
        height: image.height,
        width: image.width,
        size: image.size,
        mimeType: image.mime,
      });
    // eslint-disable-next-line
    } catch (e) {}
  };

  const getKey = (item) => item.uri;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={handleSelect(item)}
      // Put a border on both sides the middle item only, to seperate it
      // from its siblings
      style={[styles.imageWrapper, index % 3 === 1 && styles.border]}
    >
      <RNImage source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  // getItemLayout will speed up rendering since we always know the
  // dimensions of our rows
  const getItemLayout = (data, index) => ({
    length: width / 3,
    offset: (width / 3) * index,
    index,
  });

  // Request more only if we have more images. Next start will be set if we have more images
  const handleEndReached = () => {
    if (nextStart) {
      getPhotos(nextStart);
    }
  };

  if (needsPermission) {
    return (
      <View style={styles.wrapper}>
        <AskPermission
          onConfirmPress={handleShowSettingsPress}
          confirmText="Open my settings"
          onCancelPress={handlePermissionCancel}
          title="You need to grant Huddle access to your photos."
          style={sharedStyles.askPermission}
        />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header} />
      {!!loading && (
        <ActivityIndicator
          color="white"
          size="large"
          style={styles.loading}
        />
      )}
      <FlatList
        data={photos}
        numColumns={3}
        keyExtractor={getKey}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={20}
      />
      <View style={[sharedStyles.footer, styles.footer]}>
        <TouchableOpacity style={sharedStyles.button} onPress={showFolders}>
          <Icon name="folder-filled" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={sharedStyles.button} onPress={switchPage}>
          <Icon name="camera" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default CameraRoll;
