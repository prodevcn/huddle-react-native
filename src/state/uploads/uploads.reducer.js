import * as types from './uploads.types';

const defaultState = {
  // A map of itemId -> a list of uploadIds
  // {[itemId]: [uploadId]}
  items: {},

  // A map of uploadId -> upload data, which is the local image data
  // {[uploadId]: {height, width, uri, ...}}
  uploads: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    // This action should be dispatched when we save/update an item
    case types.UPLOAD_STARTED:
      return {
        ...state,
        // Merge any new uploadIds into itemId
        items: {
          ...state.items,
          [action.payload.itemId]: [
            ...(state.items[action.payload.itemId] || []),
            ...action.payload.uploadIds,
          ],
        },
        // Merge any new uploads into the upload hash
        uploads: {
          ...state.uploads,
          ...action.payload.uploads,
        },
      };

    // An image has successfully been sent to s3
    case types.FILE_UPLOAD_COMPLETE:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.payload.uploadId]: {
            ...state.uploads[action.payload.uploadId],
            docUniqueName: action.payload.docUniqueName,
            failed: false,
          },
        },
      };

    // There was an error uploading the image to s3
    case types.FILE_UPLOAD_FAILED:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.payload.uploadId]: {
            ...state.uploads[action.payload.uploadId],
            failed: true,
          },
        },
      };

    case types.TRY_AGAIN:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.payload.uploadId]: {
            ...state.uploads[action.payload.uploadId],
            failed: false,
          },
        },
      };

    default:
      return state;
  }
};
