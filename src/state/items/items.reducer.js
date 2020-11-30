import without from 'lodash/without';
import get from 'lodash/get';
import * as types from './items.types';

const defaultProfileState = {
  // Flat list of ordered itemIds
  list: [],

  // Hash of {[itemId]: item}
  items: {},

  fetchingItems: false,
  fetchingImport: true,

  // If the user came from Link, this will be an array of imports
  linkImports: null,
};

// defaultState will be keyed by profileCode and contain defaultProfileState per profile
const defaultState = {};

const reduceProfileState = (state = defaultProfileState, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS:
      return {
        ...state,
        fetchingItems: !!get(action, 'payload.showRefreshing'),
      };

    case types.FETCH_ITEMS_COMPLETED:
      return {
        ...state,
        fetchingItems: false,
        // There is no pagination when we fetch items, so just replace the list and items
        list: action.payload.list,
        items: action.payload.items,
      };

    case types.FETCH_ITEMS_FAILED:
      return {
        ...state,
        fetchingItems: false,
      };

    case types.UPLOAD_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.itemId]: action.payload.data,
        },
        list: [
          action.payload.itemId,
          ...state.list,
        ],
      };

    case types.UPDATE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.itemId]: {
            ...state.items[action.payload.itemId],
            ...action.payload.data,
          },
        },
      };

    case types.REMOVE_ITEM:
      return {
        ...state,
        // Don't remove the item from the items hash otherwise we will get an undefined
        // error cause the item details page is still visible when we delete
        list: without(state.list, action.payload.itemId),
      };

    case types.ADD_FILES_TO_ITEM:
      // If the user is switched when files uploading,
      // state.items[action.payload.itemId] will not be found and throw exception.
      // So add the judgment whether it exists.
      if (!state.list.includes(action.payload.itemId)) {
        return state;
      }
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.itemId]: {
            ...state.items[action.payload.itemId],
            files: [
              ...state.items[action.payload.itemId].files,
              ...action.payload.files,
            ],
          },
        },
      };

    case types.SET_ITEM_THUMBNAIL_URL:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.itemId]: {
            ...state.items[action.payload.itemId],
            thumbnailUrl: action.payload.thumbnailUrl,
          },
        },
      };

    case types.FETCH_LINK_IMPORTS:
      return {
        ...state,
        linkImports: action.payload,
        fetchingImport: false,
      };

    case types.FETCH_LINK_IMPORT_FAILED:
      return {
        ...state,
        fetchingImport: false,
      };

    default:
      return state;
  }
};

// Our entire item state tree is scoped by profileCode. All actions will accept an activeProfileCode
// in the meta object, which we can use to access a specific sub-tree
export default (state = defaultState, action) => {
  const profileCode = get(action, 'meta.activeProfileCode');
  if (!profileCode) return state;

  const profileState = reduceProfileState(state[profileCode], action);

  return {
    ...state,
    [profileCode]: profileState,
  };
};
