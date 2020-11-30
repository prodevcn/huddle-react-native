import * as types from './uploads.types';

export const uploadStarted = (itemId, images) => {
  const uploadIds = [];
  const uploads = {};

  images.forEach((image) => {
    uploadIds.push(image.uploadId);
    // Don't store `data` in redux. This is a huge base64 string that will just
    // take up space, and we don't actually use it
    const { data, ...uploadData } = image;
    uploads[image.uploadId] = uploadData;
  });


  return {
    type: types.UPLOAD_STARTED,
    payload: {
      uploads,
      uploadIds,
      itemId,
    },
  };
};

export const uploadFileComplete = (uploadId, docUniqueName) => ({
  type: types.FILE_UPLOAD_COMPLETE,
  payload: {
    uploadId,
    docUniqueName,
  },
});

export const uploadFileFailed = (itemId, uploadId) => ({
  type: types.FILE_UPLOAD_FAILED,
  payload: {
    itemId,
    uploadId,
  },
});

export const tryAgain = (uploadId) => ({
  type: types.TRY_AGAIN,
  payload: { uploadId },
});
