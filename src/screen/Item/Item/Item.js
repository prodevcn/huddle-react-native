import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Linking,
  InteractionManager,
  View,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import get from 'lodash/get';

import { store } from '/state/store';
import Document from '/component/Document';
import Text from '/component/Text';
import Image from '/component/Image';
import HeaderButton from '/navigation/header/HeaderButton';
import BackgroundExtension from '/component/BackgroundExtension';
import NoteField from '/partial/NoteField';
import Alert from '/overlay/Alert';
import TextArea from '/overlay/ModalTextArea';
import { NavigationInteractions } from '/util/interactionManager';
import buildHeaderRight from '/navigation/helpers/buildHeaderRight';
import * as events from '/constants/events/Items/viewItem';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { selectors as profilesSelectors } from '/state/profiles';
import UploadingImage from './UploadingImage';
import { actions as overlayActions } from '/state/overlays';
import ItemMore from '/overlay/ItemMore';
import FavoriteButton from '/navigation/header/FavoriteButton';

import Subforms from '/partial/ItemForm/subform';

import {
  actions,
  selectors,
} from '/state/items';

import api from '/api';
import screens from '/screen';
import styles from './Item.styles';
import { format } from '/util';
import { clickHandler } from '/util/offlineMode';
import { itemTypes, itemTypeLabels } from '/screen/Item/PickType';
import { linkTypes } from '/constants/config';

import globalStyles from '/styles';

export const getFields = (item) => {
  const type = item.custom && item.custom.type;
  return get(Subforms[type], 'fields', []);
};

const Item = ({ navigation }) => {
  const itemId = navigation.getParam('itemId');
  const registerTutorialDismiss = navigation.getParam('registerTutorialDismiss');
  const doc = useSelector(selectors.itemsHashSelector, shallowEqual)[itemId] || { custom: {} };
  const dispatch = useDispatch();

  const fields = getFields(doc);

  useEffect(() => {
    if (registerTutorialDismiss) {
      registerTutorialDismiss(() => navigation.dismiss());
    }
  }, []);

  let typeLabel;
  if (doc.custom.type !== itemTypes.other) {
    typeLabel = `${itemTypeLabels[doc.custom.type]} · `;
  }

  // If this field is a link, try to open it
  const handleLinkPress = (linkType, value) => async () => {
    try {
      let prefix = linkType === linkTypes.url ? '' : linkType;

      // If we have a link, we need a protocol
      if (linkType === linkTypes.url && !value.match(/https?:\/\//i)) {
        prefix = 'http://';
      }
      await Linking.openURL(`${prefix}${value}`);
    } catch (e) {
      Alert.error(api.userMessages.linking.cannotOpen);
    }
  };

  const subFields = [];

  // Get the fields that we are going to render in the item details
  fields.forEach((field) => {
    // First check the item itself, then see if the field is in its custom data
    const value = doc[field.key] || doc.custom[field.key];
    const { linkType } = field;

    // If this item has a linkType that means the user should be able to
    // click the link to open it in an application on the phone
    const Component = linkType ? TouchableOpacity : View;

    if (value) {
      subFields.push(
        <Component
          style={styles.field}
          key={field.key}
          onPress={linkType && handleLinkPress(linkType, value)}
        >
          <Text.H4 style={styles.fieldLabel}>
            {field.label}
          </Text.H4>
          <Text style={linkType && styles.underline}>
            {value}
          </Text>
        </Component>,
      );
    }
  });

  const handleNoteChange = async (values) => {
    // Don't do anything if the note doesn't change
    if (values.value === doc.note) return;

    try {
      const item = {
        ...doc,
        note: values.value || '',
      };

      await dispatch(actions.updateItem(item));
      InteractionManager.runAfterInteractions(() => {
        Alert.success(api.userMessages.updateDocument.success);
      });
    } catch (e) {
      Alert.error(api.userMessages.updateDocument.failed);
      // Make sure this error makes its way to the ModalTextArea catch block in handleSubmit
      throw new Error(e);
    }
  };

  const handleNotePress = () => {
    dispatch(overlayActions.show(TextArea, {
      onSubmit: handleNoteChange,
      value: doc.note,
      placeholder: 'Start typing your note here…',
    }));
  };

  const handleTryAgain = (upload) => {
    dispatch(actions.uploadImages(doc, [upload]));
  };

  const files = doc.files || [];

  const renderImage = (file) => {
    // Before our image is uploaded there won't actually be a file
    // for us to attach the upload to, so our whole upload is the "file."
    // When our file uploads, we don't want to switch from using the
    // local preview image to using the new document that was uploaded
    // to s3, so we attach the upload (local image) to the file (document
    // from the API that is tied to a file on s3)
    const upload = file.upload || file;

    // A file has a uri until the image is successfully uploaded to s3
    // and the user has restarted the app.
    if (upload.uri) {
      return (
        <UploadingImage
          key={upload.uploadId}
          upload={upload}
          file={file}
          style={styles.imageWrapper}
          imageStyle={files.length > 1 ? styles.multiImage : styles.image}
          onTryAgain={handleTryAgain}
        />
      );
    }

    const { mimeType } = file;
    const isImage = mimeType && mimeType.match(/image/i);

    // Use a real image from s3, not a local image
    if (file.docUniqueName) {
      if (isImage) {
        return (
          <Image
            key={file.docUniqueName}
            docUniqueName={file.docUniqueName}
            style={files.length > 1 ? styles.multiImage : styles.image}
            wrapperStyle={styles.imageWrapper}
            thumbnailUrl={file.thumbnailUrl}
          />
        );
      }

      return (
        <Document
          key={file.docUniqueName}
          style={styles.imageWrapper}
          document={file}
        />
      );
    }

    return null;
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      <NavigationInteractions />
      <View style={styles.header}>
        <BackgroundExtension />
        <Text.H2 style={styles.title}>{doc.displayName}</Text.H2>
        <Text.BodySmall style={styles.subtitle} color="medium">
          {typeLabel}
          {format.toMmmDate(doc.modifyTimestamp)}
        </Text.BodySmall>
        {!!files.length && (
          <ScrollView
            horizontal
            contentContainerStyle={styles.imageScroller}
            showsHorizontalScrollIndicator={false}
          >
            {files.map((file) => renderImage(file))}
          </ScrollView>
        )}
      </View>
      <View style={styles.fields}>
        {subFields}
        <NoteField
          note={doc.note}
          onPress={clickHandler(handleNotePress)}
          style={[
            styles.note,
            !!subFields.length && styles.noteBorder,
          ]}
        />
      </View>
    </ScrollView>
  );
};

Item.navigationOptions = ({ navigation, navigationOptions }) => {
  const readOnlyActiveProfile = profilesSelectors.readOnlyActiveProfileSelector(store.getState());
  const itemId = navigation.getParam('itemId');

  return {
    headerStyle: {
      ...navigationOptions.headerStyle,
      backgroundColor: globalStyles.palette.grey04,
    },
    headerLeft: () => <HeaderButton icon="back" onPress={() => navigation.dismiss()} />,
    headerRight: buildHeaderRight([
      {
        isTutorialAnchor: true,
        icon: 'share',
        onPress: clickHandler(() => {
          store.dispatch(trackEvent(events.CLICK_SHARE));
          navigation.push(screens.ShareLink, { itemId: navigation.getParam('itemId') });
        }),
      },
      !readOnlyActiveProfile && {
        component: (
          <FavoriteButton
            key="favorite"
            itemId={itemId}
            right
          />
        ),
      },
      !readOnlyActiveProfile && {
        icon: 'more',
        onPress: clickHandler(() => {
          store.dispatch(trackEvent(events.CLICK_DOTS));
          store.dispatch(overlayActions.show(ItemMore, {
            itemId: navigation.getParam('itemId'),
            navigation,
          }));
        }),
      },
    ]),
  };
};

export default Item;
