import React, { useState, useEffect, useRef } from 'react';
import isArray from 'lodash/isArray';

import {
  Image as RNImage,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';
import FullScreenImage from '/overlay/FullScreenImage';

import { actions } from '/state/images';
import { actions as overlayActions } from '/state/overlays';
import { selectors as offlineModeSelectors } from '/state/offlineMode';
import useThumbnailDownload from '/hook/useThumbnailDownload';

import api from '/api';
import Alert from '/overlay/Alert';

import styles from './Image.styles';

const Image = ({
  docUniqueName,
  style,
  maintainAspectRatio = true,
  placeholder,
  thumbnailUrl,
  wrapperStyle,
  tempImage,
  navigation,
  ...rest
}) => {
  if (isArray(style)) {
    // The styles that we pass in cannot be an array, because we are using the style prop
    // to calculate the image size. If you need to use an array, maybe you can get away with
    // some extra logic to create a normal style object.
    // This will bite someone eventually, so lets show the dev an error if they try to do it
    // eslint-disable-next-line no-console
    console.error('You cannot pass an array of styles into out custom Image component');
  }

  const dispatch = useDispatch();

  const isOnline = !useSelector(offlineModeSelectors.isOffline);
  const cachedImage = useSelector((state) => state.images.images[docUniqueName]);
  const image = tempImage || cachedImage;

  const {
    tempThumbnailUri,
    fetchThumbnail,
  } = useThumbnailDownload(docUniqueName);

  let uri;
  let imageDimensions;

  if (image) {
    uri = image.uri;
    // We need both the height and width for the image to be valid
    if (image.width && image.height) {
      imageDimensions = {
        width: image.width,
        height: image.height,
      };
    }
  }

  const hasLocalImage = uri && imageDimensions;

  const [thumbnailDimensions, setThumbnailDimensions] = useState(null);
  const [thumbnailOpacity] = useState(new Animated.Value(thumbnailUrl ? 1 : 0));

  // We use the image loaded state to enable/disable tapping an image to zoom in
  const [imageLoaded, setImageLoaded] = useState(hasLocalImage);

  // We only want to automatically re-fetch the image once. Use this ref to track
  // if the image has already been auto-refetched
  const imageLoadingError = useRef(null);

  const fetchImage = async () => {
    // download the item from the API - this will return us a one-time-use
    // presigned url that we can download direct from S3
    if (isOnline) {
      await dispatch(actions.downloadItem(docUniqueName));
    }
  };

  useEffect(() => {
    if (!docUniqueName) return;

    // If we have a thumbnail, measure it's dimensions
    if (thumbnailUrl) {
      RNImage.getSize(thumbnailUrl, (width, height) => {
        setThumbnailDimensions({ width, height });
      }, () => {
        fetchThumbnail();
      });
    }

    // If we don't have complete data, fetch a new image
    if (!hasLocalImage && isOnline) {
      fetchImage();
    }
  }, [isOnline]);

  // Once we load an image, fade out the thumbnail
  const handleLoad = async () => {
    setImageLoaded(true);

    Animated.timing(thumbnailOpacity, {
      toValue: 0,
      useNativeDriver: true,
      duration: 350,
      easing: Easing.ease,
    }).start();
  };

  // Given image dimensions, scale it down to match the correct width/height
  // that were provided by the style prop
  const getImageSize = (dimensions) => {
    const sizeStyle = { width: style.width || 0, height: style.height || 0 };
    if (!(maintainAspectRatio && dimensions)) {
      return sizeStyle;
    }

    // if we only provide a height or width, use that size to determine the other size
    if (style.width && !style.height) {
      sizeStyle.height = (style.width / dimensions.width) * dimensions.height;
    } else if (style.height && !style.width) {
      sizeStyle.width = (style.height / dimensions.height) * dimensions.width;
    } else if (dimensions.height > dimensions.width) {
      // Otherwise we will scale the object according to the aspect ratio
      sizeStyle.width = style.width * (dimensions.width / dimensions.height);
    } else if (dimensions.width > dimensions.height) {
      sizeStyle.height = style.height * (dimensions.height / dimensions.width);
    }

    // If we have a max width or height set make sure we are obeying those rules
    if (style.maxWidth && sizeStyle.width > style.maxWidth) {
      sizeStyle.height *= (style.maxWidth / sizeStyle.width);
      sizeStyle.width = style.maxWidth;
    } else if (style.maxHeight && sizeStyle.height > style.maxHeight) {
      sizeStyle.width *= (style.maxHeight / sizeStyle.height);
      sizeStyle.height = style.maxHeight;
    }
    return sizeStyle;
  };

  // We will pretty much immediately get the dimensions of the thumbnail, since we should have
  // them pre-downloaded. Using the thumbnail dimensions here means that the view will be the
  // correct size from the start - which leads to a really seamless loading experience
  const imageSize = imageDimensions
    ? getImageSize(imageDimensions)
    : getImageSize(thumbnailDimensions);

  const handleImagePress = () => {
    if (imageLoaded) {
      dispatch(overlayActions.show(FullScreenImage, {
        uri,
        dimensions: imageDimensions,
      }));
    } else if (!isOnline) {
      Alert.error(api.userMessages.offline.fileNotSavedLocally);
    }
  };

  // If an image download fails, try to re-download it. If that fails, we will show an alert.
  // I retry incase there was a caching issue
  const handleLoadError = () => {
    if (imageLoadingError.current) {
      Alert.error(api.userMessages.downloadImage.error, {
        onPress: () => fetchImage(),
      });
    } else {
      imageLoadingError.current = true;
      fetchImage();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.wrapper, wrapperStyle]}
      onPress={handleImagePress}
      disabled={!imageLoaded && isOnline}
    >
      {!!hasLocalImage && (
        <RNImage
          source={{ uri }}
          style={[styles.image, style, imageSize]}
          {...rest}
          onLoad={handleLoad}
          onError={handleLoadError}
        />
      )}

      {!!thumbnailUrl && (
        <Animated.Image
          source={{ uri: thumbnailUrl || tempThumbnailUri }}
          style={[
            styles.image,
            styles.thumbnail,
            { opacity: thumbnailOpacity },
            style,
            getImageSize(thumbnailDimensions),
            !hasLocalImage && styles.thumbnailPlaceholder,
          ]}
          {...rest}
          onError={fetchThumbnail}
        />
      )}
    </TouchableOpacity>
  );
};

export default withNavigation(Image);
