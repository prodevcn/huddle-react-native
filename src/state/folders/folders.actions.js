import * as types from './folders.types';
import itemConstants from '/constants/items';
import folderConstants from '/constants/folders';
import api from '/api';
import { asArray, itemsHelper } from '/util';
import { favoritesFolderSelector } from './folders.selectors';

/**
 * We will receive the list of folders when we fetch items. Once we parse
 * the payload we can pass it into the action to remove any non-item folders
 * @param {array} folders
 */
export const setFolders = (folders) => {
  const list = [];
  const allFolders = {};

  folders.forEach((folder) => {
    // We are using folders to represent items, but we are also using folders to represent
    // folders :o. This check pulls out any folder that is actually an item
    const isFolder = folder.tags && folder.tags.indexOf(itemConstants.IS_ITEM) === -1;
    if (!isFolder) return;

    list.push(folder.folderUniqueName);
    allFolders[folder.folderUniqueName] = itemsHelper.parse(folder);
  });

  return {
    type: types.SET_FOLDERS,
    payload: {
      list,
      folders: allFolders,
    },
  };
};

/**
 * Make an API call to create a folder
 *
 * @param {string} displayName
 */
export const createFolder = (displayName, tags = []) => async (dispatch, getState) => {
  const profileCode = getState().profiles.activeProfileCode;

  const res = await api.folder.create({
    displayName,
    tags,
  }, profileCode);

  // Insert the folder into the state in the same format we get back when we call folder:list
  dispatch({
    type: types.CREATE_FOLDER,
    payload: {
      displayName,
      folderUniqueName: res.folderUniqueName,
      docUniqueName: [],
      custom: {},
      tags,
      note: '',
    },
  });

  return res.folderUniqueName;
};

export const updateFolder = (data) => async (dispatch, getState) => {
  const profileCode = getState().profiles.activeProfileCode;

  await api.folder.update(data, profileCode);

  // Insert the folder into the state in the same format we get back when we call folder:list
  dispatch({
    type: types.UPDATE_FOLDER,
    payload: {
      folderUniqueName: data.folderUniqueName,
      displayName: data.displayName,
    },
  });
};

/**
 * Add the `itemId` to the list of the folders `docUniqueName`
 *
 * @param {string} folderUniqueName
 * @param {string} itemId
 */
export const addItemToFolder = (folderUniqueName, itemId) => async (dispatch, getState) => {
  const profileCode = getState().profiles.activeProfileCode;

  await api.folder.addDoc(folderUniqueName, [itemId], profileCode);

  dispatch({
    type: types.ADD_ITEM_TO_FOLDER,
    payload: {
      itemId,
      folderUniqueName,
    },
  });
};

/**
 * Delete a folder
 *
 * @param {string} folderUniqueName
 */
export const removeFolder = (folderUniqueName) => async (dispatch, getState) => {
  const profileCode = getState().profiles.activeProfileCode;
  await api.folder.remove(folderUniqueName, profileCode);

  dispatch({
    type: types.REMOVE_FOLDER,
    payload: {
      folderUniqueName,
    },
  });
};

/**
 * Add all the itemIds provided to the list of selected items
 *
 * @param {[string]} itemIds
 */
export const selectItems = (itemIds) => ({
  type: types.SELECT_ITEMS,
  payload: {
    itemIds: asArray(itemIds),
  },
});

/**
 * Remove all the itemIds provided from the list of selected items
 *
 * @param {[string]} itemIds
 */
export const unselectItems = (itemIds) => ({
  type: types.UNSELECT_ITEMS,
  payload: {
    itemIds: asArray(itemIds),
  },
});

/**
 * Remove all selected items
 */
export const clearSelectedItems = () => ({
  type: types.CLEAR_SELECTED_ITEMS,
});

/**
 * Make the API call to add all selected items to `folderUniqueName`
 *
 * @param {string} folderUniqueName
 */
export const addSelectedItems = (folderUniqueName) => async (dispatch, getState) => {
  const state = getState();
  const profileCode = state.profiles.activeProfileCode;
  const documents = state.folders.selectedItems;

  if (documents && documents.length) {
    await api.folder.addDoc(folderUniqueName, documents, profileCode);
  }

  dispatch({
    type: types.ADD_SELECTED_ITEMS,
    payload: {
      folderUniqueName,
    },
  });
};

/**
 * Remove the given items from this folder
 *
 * @param {string} folderUniqueName
 * @param {[string]} itemIds
 */
export const removeItemsFromFolder = (folderUniqueName, itemIds) => async (dispatch, getState) => {
  const state = getState();
  const profileCode = state.profiles.activeProfileCode;

  await api.folder.removeDoc(itemIds, profileCode, folderUniqueName);

  dispatch({
    type: types.REMOVE_ITEMS_FROM_FOLDER,
    payload: {
      folderUniqueName,
      itemIds,
    },
  });
};

/**
 * Add the given item from to favorites folder. If the favorites folder does not
 * exist we will first create the folder. Then we will add the item to that folder
 *
 * @param {string} itemId
 */
export const addFavorite = (itemId) => async (dispatch, getState) => {
  const state = getState();
  const favorites = favoritesFolderSelector(state);
  const profileCode = state.profiles.activeProfileCode;

  let folderUniqueName;

  // If we do not have a favorites folder we will first create one, identifying it with a tag
  if (!favorites) {
    const res = await dispatch(createFolder('Favorites', [folderConstants.IS_FAVORITES]));
    folderUniqueName = res;
  } else {
    folderUniqueName = favorites.folderUniqueName;
  }

  await api.folder.addDoc(folderUniqueName, [itemId], profileCode);

  dispatch({
    type: types.ADD_ITEM_TO_FOLDER,
    payload: {
      itemId,
      folderUniqueName,
    },
  });
};

/**
 * Remove the given item from the favorites folder
 *
 * @param {string} itemId
 */
export const removeFavorite = (itemId) => async (dispatch, getState) => {
  const state = getState();
  const favorites = favoritesFolderSelector(state);
  const profileCode = state.profiles.activeProfileCode;

  await api.folder.removeDoc([itemId], profileCode, favorites.folderUniqueName);

  dispatch({
    type: types.REMOVE_ITEMS_FROM_FOLDER,
    payload: {
      folderUniqueName: favorites.folderUniqueName,
      itemIds: [itemId],
    },
  });
};
