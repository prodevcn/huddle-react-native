/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import constants from '/constants/folders';
import itemsHelper from '/util/itemsHelper';
import { selectors as profilesSelectors } from '/state/profiles';

// Get the item state scoped to the activeProfileCode
const getFolderState = (state) => {
  const activeProfile = profilesSelectors.activeProfileCodeSelector(state);
  return state.folders[activeProfile] || {};
};

export const allFoldersSelector = (state) => getFolderState(state).all || {};
export const selectedItemsSelector = (state) => getFolderState(state).selectedItems || {};

const listFoldersSelector = (state) => getFolderState(state).list || [];

export const foldersSelector = createSelector(
  allFoldersSelector,
  listFoldersSelector,
  (all, list) => {
    const folders = list.map((listId) => all[listId]);

    // Sort so that the favourites folder is first in the list. After that sort by created date
    return folders.sort((f1, f2) => {
      if (f1.tags && f1.tags.indexOf(constants.IS_FAVORITES) > -1) return -1;
      if (f2.tags && f2.tags.indexOf(constants.IS_FAVORITES) > -1) return 1;

      return itemsHelper.orderCreated(f1, f2);
    });
  },
);

// Return the favorites folder
export const favoritesFolderSelector = createSelector(
  foldersSelector,
  (folders) => folders.find((folder) => folder.tags.indexOf(constants.IS_FAVORITES) > -1),
);

// Return the list of favorite'd item ids
export const favoritesSelector = createSelector(
  favoritesFolderSelector,
  (favorites) => (favorites ? favorites.docUniqueName : []),
);
