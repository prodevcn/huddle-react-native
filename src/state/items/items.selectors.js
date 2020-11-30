import { createSelector } from 'reselect';
import keys from 'lodash/keys';

import { itemTypes } from '/screen/Item/PickType';
import { selectors as uploadsSelectors } from '/state/uploads';
import { selectors as profilesSelectors } from '/state/profiles';

// Get the item state scoped to the activeProfileCode
const getItemState = (state) => {
  const activeProfile = profilesSelectors.activeProfileCodeSelector(state);
  return state.items[activeProfile] || {};
};

export const itemListSelector = (state) => getItemState(state).list || [];

// **Note**: You should most likely use itemsHashSelector over allItemsSelector
// unless you know that you need allItemsSelector
export const allItemsSelector = (state) => getItemState(state).items || {};
export const fetchingItemsSelector = (state) => getItemState(state).fetchingItems || false;
export const linkImportsSelector = (state) => getItemState(state).linkImports;
export const loadingImportSelector = (state) => getItemState(state).fetchingImport;

// Get all items, in a flat list
export const itemsSelector = createSelector(
  itemListSelector,
  allItemsSelector,
  (list, all) => list.map((itemId) => ({ ...(all[itemId] || {}) })),
);

// Get a hash of items, keyed by `docUniqueName`
export const itemsHashSelector = createSelector(
  allItemsSelector,
  uploadsSelectors.uploadsSelector,
  uploadsSelectors.itemsSelector,
  (all, allUploads, uploadItems) => {
    const items = {};
    keys(all).forEach((itemId) => {
      // Get all the uploads for the current item
      const uploads = (uploadItems[itemId] || []).map((uploadId) => (
        allUploads[uploadId]
      ));

      // Is there a current upload associated with this document? This is the case
      // where a document has successfully uploaded to s3, before the app has
      // restarted (at which point redux-persist cleans up successful uploads)
      const files = all[itemId].files.map((file) => ({
        ...file,
        upload: uploads.find((upload) => upload.docUniqueName === file.docUniqueName),
      }));

      // Get all uploads that have not completed (ie. don't have a docUniqueName)
      // and add them to the files list
      uploads
        .filter((upload) => !upload.docUniqueName)
        .forEach((upload) => files.unshift(upload));

      const item = {
        ...all[itemId],
        files,
      };

      items[itemId] = item;
    });

    return items;
  },
);

export const insuranceItems = createSelector(
  itemsSelector,
  (items) => items.filter((item) => item.custom.type === itemTypes.insurance),
);

export const hasItems = createSelector(
  itemListSelector,
  (list) => !!list.length,
);
