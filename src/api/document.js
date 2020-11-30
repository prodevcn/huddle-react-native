import api from './serverAgent';
import { itemInputSources } from '/constants/config';
import { thumbnailsHelper, generateThumbnail } from '/util';
import { create as createFolder, addDoc, removeDoc } from './folder';
import itemConstants from '/constants/items';
import { itemTypes } from '/screen/Item/PickType';

const RESOURCE = 'doc';

/**
 * Upload an image to s3 using pre-signed URLs generated on the Huddle API
 *
 * @param {object} image
 * `image` should be the raw image data from `ImagePicker.pickImage`. It should include a `uri`
 * @param {string} name
 * `name` will not be visible to the user. It can really be whatever tickles your fancy
 * @param {string} profileCode
 */
export const uploadImage = async (image, name, profileCode) => {
  // Request a pre-signed s3 url from the Huddle API
  const preuploadRes = await api.post(RESOURCE, 'preupload');
  const { internalAccessName, uploadLink } = preuploadRes;

  // Use this presigned url to upload directly to S3
  await api.uploadImage(uploadLink, internalAccessName, image);

  let thumbnail;
  if (image.mimeType && image.mimeType.match(/image/i)) {
  // Generate a thumbnail for the image
    const isLandscape = image.width > image.height;
    thumbnail = await generateThumbnail(image.uri, 48, isLandscape);
  }

  // After we upload to s3 we upload a document to the Huddle API.
  // Note: we are passing in `internalAccessName`, which is the
  // identifier for this file on S3 and how the API will generate
  // a link for us to download the image in the future
  const newUpload = await api.post(RESOURCE, 'upload', {
    name,
    folderUniqueName: [],
    internalAccessName,
    filename: name,
    mimeType: image.mimeType,
    note: '',
    tags: [],
    thumbnail,
  }, { accessContext: { profileCode } });

  return {
    docUniqueName: newUpload.docUniqueName,
    mimeType: image.mimeType,
    thumbnailUrl: thumbnailsHelper.getPath(newUpload.docUniqueName),
    thumbnail,
  };
};

/**
 * Create a new item.
 *
 * Since the API does not support multiple image upload, we need to upload all images
 * as individual documents, and create a folder to hold these documents.
 *
 * We give the folder a tag: `isItem` so that we can filter out items and not show them
 * in lists of folders.
 *
 * We create one item with tag `isMaster`. This item will hold all of the item data such
 * as name, custom data, and which folders the item actually belongs to.
 *
 * When the front-end gets items, it will convert the folder into an "item." to remove
 * the confusion of folder-items versus normal folders.
 *
 * You should upload and add images elsewhere, asynchronously.
 *
 * @param {object} data
 * The item data
 * @param {string} profileCode
 */
export const upload = async (data = {}, profileCode) => {
  const { custom, ...item } = data;
  // if an Item is added via Huddle apps such as file upload, manual entry, or photo taking
  if (!custom.inputSource) {
    custom.inputSource = itemInputSources.huddle;
  }

  if (!custom.type) {
    custom.type = itemTypes.other;
  }

  const customString = JSON.stringify(custom);

  // Create a master item - this will be what stores the actual item information
  // such as the type, name, and any custom data. When we fetch our items
  // in the future, we will get one folder per-item, and then use this
  // master item to populate the item data that we will render in the app
  const bundle = {
    ...item,
    folderUniqueName: [],
    mimeType: 'application/json',
    tags: [itemConstants.IS_MASTER],
    custom: customString,
  };

  const masterItem = await api.post(RESOURCE, 'upload', bundle, { accessContext: { profileCode } });

  // The API does not support documents having multiple images, so we need to
  // use this hack and store multiple documents in a folder to simulate an
  // item that has many images
  const folder = await createFolder({
    displayName: 'folder-1',
    tags: [itemConstants.IS_ITEM],
  }, profileCode);

  await addDoc(folder.folderUniqueName, [
    masterItem.docUniqueName,
  ], profileCode);

  // the object we are retuning a document in the same format we would get from the
  // api when we `document:view`. We will insert this into redux so the user can
  // immediately see their new item.
  return {
    ...bundle,
    folderUniqueName: folder.folderUniqueName,
    displayName: bundle.filename,
    docUniqueName: masterItem.docUniqueName,
    modifyTimestamp: (new Date()).toISOString(),
    createTimestamp: (new Date()).toISOString(),
    files: [],
  };
};

/**
 * Update an item.
 *
 * We are updating the master item and removing any images (documents)
 * from the folder which the user deleted.
 *
 * @param {object} data
 * @param {string} data.docUniqueName
 * The item data
 * @param {[object]} imagesToRemove
 * The images that the user would like to remove.
 * **Note**: new images will be added in the action
 */
export const update = async (data = {}, imagesToRemove = [], profileCode) => {
  const {
    files = [],
    folderUniqueName,
    filename,
    displayName,
    custom,
    ...item
  } = data;

  if (imagesToRemove.length) {
    await removeDoc(imagesToRemove, profileCode);
  }

  const customString = JSON.stringify(custom);
  // We migth not be given a filename, fallback to the old displayName
  const newName = filename || displayName;

  // Update the document that has the `IS_MASTER` tag.
  await api.post(RESOURCE, 'update', {
    ...item,
    filename: newName,
    custom: customString,
  });

  // Filter the files so that the front-end can correctly render the list
  const updatedFiles = files.filter((file) => !imagesToRemove.includes(file.docUniqueName));

  return {
    ...item,
    displayName: newName,
    custom: customString,
    folderUniqueName,
    modifyTimestamp: (new Date()).toISOString(),
    files: updatedFiles,
  };
};

/**
 * Download the file for the document with `docUniqueName`
 *
 * @param {string} docUniqueName
 */
export const download = async (docUniqueName) => {
  const data = await api.post(RESOURCE, 'download', { docUniqueName });
  return data.downloadLink;
};

/**
 * Removes the document with `docUniqueName`
 *
 * @param {string} docUniqueName
 */
export const remove = (docUniqueName) => api.post(RESOURCE, 'remove', { docUniqueName });

/**
 * Fetch the document with `docUniqueName`
 *
 * @param {string} docUniqueName
 */
export const view = (docUniqueName) => api.post(RESOURCE, 'view', { docUniqueName });

/**
 * Fetch a thumbnail (if `docUniqueName` is provided), or get back a list
 * of all thumbnails for the current user
 *
 * If `docUniqueName` is provided it will only fetch the thumbnail for that file,
 * otherwise it will fetch all thumbnails for this user, and return them in an array
 * of items: {docUniqueName: X, thumbnail: Y}
 *
 * @param {string} [docUniqueName]
 */
export const fetchThumbnail = async (docUniqueName) => {
  const params = {};
  if (docUniqueName) {
    params.docUniqueName = docUniqueName;
  }

  const res = await api.post(RESOURCE, 'thumbnail', params);

  // The response from the API will contain a list of items. Each one will contain
  // a base64 thumbnail - we will store these locally
  const promises = res.thumbnailDataList.map((thumbnail) => {
    const { docUniqueName: docId, thumbnail: data } = thumbnail;
    return thumbnailsHelper.saveThumbnail(docId, data);
  });

  return Promise.all(promises);
};
