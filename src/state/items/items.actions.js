/* eslint-disable import/prefer-default-export */
import api from '/api';
import omit from 'lodash/omit';

import { itemsHelper, thumbnailsHelper } from '/util';
import { actions as uploadActions } from '/state/uploads';
import { actions as alertActions } from '/state/alerts';
import { actions as profileActions } from '/state/profiles';
import { actions as folderActions } from '/state/folders';
import { actions as imageActions } from '/state/images';
import { trackError } from '/state/mixpanel/mixpanel.actions';
import { allItemsSelector } from './items.selectors';

import NavigationService from '/navigation/NavigationService';

import * as types from './items.types';
import screens from '/screen';

import { itemInputSources } from '/constants/config';
import { itemTypes } from '/screen/Item/PickType';

export const fetchItemsComplete = (response) => (dispatch) => {
  const { items, itemIds } = itemsHelper.createFromFolders(response);

  dispatch({
    type: types.FETCH_ITEMS_COMPLETED,
    payload: {
      list: itemIds,
      items,
    },
  });
};

export const fetchItems = (showRefreshing, profileCode) => async (dispatch, getState) => {
  const { isOffline } = getState().offlineMode;
  if (isOffline) {
    dispatch({ type: 'NOOP' });
    return null;
  }

  try {
    dispatch({
      type: types.FETCH_ITEMS,
      payload: {
        showRefreshing,
      },
    });

    const res = await api.folder.list(profileCode);
    dispatch(fetchItemsComplete(res));
    dispatch(folderActions.setFolders(res.folder));

    return res;
  } catch (e) {
    dispatch({ type: types.FETCH_ITEMS_FAILED });
  }

  return null;
};

const addFilesToItem = (itemId, files) => ({
  type: types.ADD_FILES_TO_ITEM,
  payload: {
    itemId,
    files,
  },
});

const setItemThumbnailUrl = (itemId, thumbnailUrl) => ({
  type: types.SET_ITEM_THUMBNAIL_URL,
  payload: {
    itemId,
    thumbnailUrl,
  },
});

export const uploadImages = (item, images) => async (dispatch, getState) => {
  const profileCode = getState().profiles.activeProfileCode;
  const successfulUploads = [];
  const errorUploads = [];

  const imagePromises = images.map(async (upload) => {
    try {
      // Incase we are trying again, dispatch this. It's a noop if the
      // image is not already in the store (eg. on initial upload)
      dispatch(uploadActions.tryAgain(upload.uploadId));

      const uploadName = upload.filename || upload.uploadId;

      // Upload the image to s3 and then create a document in Huddle
      const document = await api.document.uploadImage(upload, uploadName, profileCode);
      successfulUploads.push({ upload, document });

      try {
        await dispatch(imageActions.cacheLocalFile(upload, document));
        // eslint-disable-next-line no-empty
      } catch (e) { }
    } catch (e) {
      dispatch(trackError('Failed to upload a file', e));
      // We will wait for all images to either fail or succeed, which is why we are adding
      // this upload to an array at this point in time
      errorUploads.push({ upload, status: e.status });
    }
  });

  await Promise.all(imagePromises);

  if (successfulUploads.length) {
    try {
      await api.folder.addDoc(
        item.folderUniqueName,
        successfulUploads.map(({ document }) => document.docUniqueName),
        profileCode,
      );

      const documents = [];
      const files = [];

      successfulUploads.forEach(({ upload, document }) => {
        documents.push(document);
        files.push(document);

        // Mark every upload as completed. These will be cleaned up next time redux-persist
        // hudrates the store. We want to leave them around for the time being because if
        // we get rid of the uploads, the item will re-render and it can cause a janky
        // flicker on the images as they switch from the local image to the s3 image
        dispatch(uploadActions.uploadFileComplete(upload.uploadId, document.docUniqueName));
      });

      let thumbnailUrl;
      documents.forEach((doc) => {
        if (doc.thumbnail) {
          thumbnailsHelper.saveThumbnail(doc.docUniqueName, doc.thumbnail);

          // The first file thumbnail will be the thumbnail for our item
          if (!thumbnailUrl) {
            thumbnailUrl = thumbnailsHelper.getPath(doc.docUniqueName);
          }
        }
      });

      // When we add our files to our item we will use the thumbnailUrl. The thumbnail was only
      // needed to save the thumbnail to the device cache, so remove the thumbnail before
      // saving in redux
      dispatch(addFilesToItem(item.docUniqueName, files.map((file) => omit(file, 'thumbnail'))));
      dispatch(setItemThumbnailUrl(item.docUniqueName, thumbnailUrl));
    } catch (e) {
      successfulUploads.forEach(({ upload }) => errorUploads.push({ upload, status: e.status }));
    }
  }

  if (errorUploads.length) {
    // Mark each file that failed to upload. This will let us indicate to the user which
    // files were not uploaded
    errorUploads.forEach(({ upload }) => {
      dispatch(uploadActions.uploadFileFailed(item.docUniqueName, upload.uploadId));
    });

    const { INVALID_MIMETYPE } = api.errorCodes;

    const mimeIssue = !!errorUploads.find(({ status }) => status === INVALID_MIMETYPE);
    const message = mimeIssue
      ? api.userMessages.upload.invalidMimeType
      : api.userMessages.upload.imageUploadFailed;

    dispatch(alertActions.show({
      ...message,
      type: 'warning',
      onPress: () => {
        NavigationService.navigate(screens.Item, { itemId: item.docUniqueName });
      },
    }));
  } else if (successfulUploads.length) {
    dispatch(alertActions.show({
      ...api.userMessages.upload.imageUploadComplete,
      type: 'success',
    }));
  }
};

export const uploadItem = (data, images = {}, profileCodeProp) => async (dispatch, getState) => {
  const currentProfile = getState().profiles.activeProfileCode;
  const profileCode = profileCodeProp || currentProfile;

  // Create the master item and the folder that the images will live in
  const newItem = await api.document.upload(data, profileCode);

  // If we are adding an item to a different profile we don't want to add it
  // to redux since the items in redux should only be for the current user
  if (profileCode === currentProfile) {
    dispatch({
      type: types.UPLOAD_ITEM,
      payload: {
        itemId: newItem.docUniqueName,
        data: itemsHelper.parse(newItem),
      },
    });
  }

  // After we have our folder and masterItem we can async upload our other files
  const newImages = images.add || [];

  dispatch(uploadActions.uploadStarted(newItem.docUniqueName, newImages));
  dispatch(uploadImages(newItem, newImages));

  // If we added this item to a different profile, switch to that profile
  if (profileCodeProp && profileCodeProp !== currentProfile) {
    dispatch(profileActions.setActiveProfile(profileCodeProp));
  }

  return newItem.docUniqueName;
};

export const updateItem = (data = {}, images = {}) => async (dispatch, getState) => {
  const profileCode = getState().profiles.activeProfileCode;

  // Update the master item and remove any files from the folder-item
  const item = await api.document.update(data, images.remove, profileCode);

  const itemId = data.docUniqueName;

  dispatch({
    type: types.UPDATE_ITEM,
    payload: {
      itemId,
      data: itemsHelper.parse(item),
    },
  });

  // Async upload all the new files
  const newImages = images.add || [];

  dispatch(uploadActions.uploadStarted(item.docUniqueName, newImages));
  dispatch(uploadImages(item, newImages));
};

export const removeItem = (itemId) => async (dispatch, getState) => {
  const item = allItemsSelector(getState())[itemId];
  const profileCode = getState().profiles.activeProfileCode;

  // We need to delete all the sub-documents associated with this item
  await Promise.all(item.files.map((doc) => {
    if (doc && doc.docUniqueName) {
      return api.document.remove(doc.docUniqueName);
    }

    return Promise.resolve();
  }));

  // Remove the master document
  await api.document.remove(itemId);

  // Finally remove the folder
  await api.folder.remove(item.folderUniqueName, profileCode);

  return dispatch({
    type: types.REMOVE_ITEM,
    payload: {
      itemId,
    },
  });
};

const formatItem = (item) => ({
  filename: item.drugDescription,
  displayName: item.drugDescription,
  // `ndc` stands for National Drug Code and I was told it is a unique identifier
  // which can be used if no `medicationId` is provided
  medicationId: item.medicationId || item.ndc,
  docUniqueName: item.medicationId || item.ndc,
  custom: {
    inputSource: itemInputSources.link,
    date: (item.startDate && item.startDate.date),
    status: 'active',
    type: itemTypes.medication,
  },
});

// Fetch any imports from link
export const fetchLinkImports = (profile) => async (dispatch) => {
  try {
    const res = await api.link.getActiveMed(profile.profileCode);

    const formatted = [];

    res.activeMedicationList.forEach((item) => {
      formatted.push(formatItem(item));
    });

    res.medicationList.forEach((item) => {
      formatted.push(formatItem(item));
    });

    dispatch({
      type: types.FETCH_LINK_IMPORTS,
      payload: formatted,
    });

    return formatted;
  } catch (e) {
    dispatch(trackError('Registration flow cannot import medication', e));

    dispatch({
      type: types.FETCH_LINK_IMPORT_FAILED,
    });
  }
  return [];
};

export const addNote = (title, value) => (dispatch) => dispatch(uploadItem({
  filename: title,
  note: value,
  custom: { type: itemTypes.note },
}));

/**
 * @param {string} medicationId fdb_medId format
 */
export const saveSelectedMedication = (medicationId) => async (dispatch, getState) => {
  dispatch({ type: types.SAVE_SELECTED_MED });

  try {
    const { activeProfileCode } = getState().profiles;

    await api.tool.saveSelectedMed({ medicationId, profileCode: activeProfileCode });
    dispatch({ type: types.SAVE_SELECTED_MED_COMPLETED });
  } catch {
    dispatch({ type: types.SAVE_SELECTED_MED_FAILED });
  }
};
