import omit from 'lodash/omit';
import * as imageConstants from './images.types';
import * as itemConstants from '/state/items/items.types';

const defaultState = {
  images: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case itemConstants.REMOVE_ITEM:
      return {
        ...state,
        images: omit(state.images, action.payload.itemId),
      };

    case imageConstants.DOWNLOAD_ITEM:
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload.itemId]: action.payload.data,
        },
      };

    default:
      return state;
  }
};
