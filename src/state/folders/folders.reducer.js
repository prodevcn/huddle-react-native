import without from 'lodash/without';
import uniq from 'lodash/uniq';
import keys from 'lodash/keys';
import get from 'lodash/get';

import * as types from './folders.types';
import * as itemTypes from '../items/items.types';

const defaultProfileState = {
  all: {},
  list: [],
  selectedItems: [],
};

// defaultState will be keyed by profileCode and contain defaultProfileState per profile
const defaultState = {};

const removeItemFromFolders = (state, itemId) => {
  const newAll = {};
  // Loop over every folder in the state and update it's docUniqueName list
  // to exclude the item that was deleted
  keys(state.all).forEach((folderId) => {
    newAll[folderId] = {
      ...state.all[folderId],
      docUniqueName: without(state.all[folderId].docUniqueName, itemId),
    };
  });

  return {
    ...state,
    all: newAll,
  };
};

const addSelectedItems = (state, action) => {
  const { folderUniqueName } = action.payload;

  const folder = state.all[folderUniqueName];

  switch (action.type) {
    // When we add the selected items to a folder we clear the folder out of the `selectedItems`
    // hash and also copy all of the itemIds into the folders `docUniqueName` list
    case types.ADD_SELECTED_ITEMS:
      return {
        ...state,
        selectedItems: [],
        all: {
          ...state.all,
          [folderUniqueName]: {
            ...folder,
            docUniqueName: uniq(folder.docUniqueName.concat(state.selectedItems)),
          },
        },
      };

    default:
      return state;
  }
};

const reduceProfileState = (state = defaultProfileState, action) => {
  switch (action.type) {
    case types.SET_FOLDERS:
      return {
        ...state,
        all: action.payload.folders,
        list: action.payload.list,
      };

    case types.CREATE_FOLDER:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.folderUniqueName]: action.payload,
        },
        list: [
          action.payload.folderUniqueName,
          ...state.list,
        ],
      };

    case types.UPDATE_FOLDER:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.folderUniqueName]: {
            ...state.all[action.payload.folderUniqueName],
            displayName: action.payload.displayName,
          },
        },
      };

    case types.ADD_ITEM_TO_FOLDER:
      // Insert the itemId into the folder's docUniqueName list
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.folderUniqueName]: {
            ...state.all[action.payload.folderUniqueName],
            docUniqueName: [
              ...state.all[action.payload.folderUniqueName].docUniqueName,
              action.payload.itemId,
            ],
          },
        },
      };

    case types.REMOVE_FOLDER:
      return {
        ...state,
        list: without(state.list, action.payload.folderUniqueName),
      };

    case types.SELECT_ITEMS:
      return {
        ...state,
        selectedItems: uniq(state.selectedItems.concat(action.payload.itemIds)),
      };

    case types.UNSELECT_ITEMS:
      return {
        ...state,
        selectedItems: without(state.selectedItems, ...action.payload.itemIds),
      };

    case types.ADD_SELECTED_ITEMS:
      return addSelectedItems(state, action);

    case types.CLEAR_SELECTED_ITEMS:
      return {
        ...state,
        selectedItems: [],
      };

    case types.REMOVE_ITEMS_FROM_FOLDER:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.folderUniqueName]: {
            ...state.all[action.payload.folderUniqueName],
            docUniqueName: without(
              state.all[action.payload.folderUniqueName].docUniqueName,
              ...action.payload.itemIds,
            ),
          },
        },
      };

    case itemTypes.REMOVE_ITEM:
      return removeItemFromFolders(state, action.payload.itemId);

    default:
      return state;
  }
};

// Our entire folder state tree is scoped by profileCode. All actions will accept an
// activeProfileCode in the meta object, which we can use to access a specific sub-tree
export default (state = defaultState, action) => {
  const profileCode = get(action, 'meta.activeProfileCode');
  if (!profileCode) return state;

  const profileState = reduceProfileState(state[profileCode], action);

  return {
    ...state,
    [profileCode]: profileState,
  };
};
