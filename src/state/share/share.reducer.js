import * as types from './share.types';
import { format } from '/util';

const defaultState = {
  errorMessage: '',
  linkData: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.DISABLE_SHARED_LINKS: {
      const applyDisabled = (datum) => {
        if (action.shareIds && action.shareIds.includes(datum.shareId)) {
          return {
            ...datum,
            deleted: format.toMmmDate(new Date()),
            deletedRaw: format.toDate(new Date()),
          };
        }

        return datum;
      };

      return {
        ...state,
        linkData: state.linkData.map(applyDisabled),
      };
    }

    case types.LOAD_SHARED_ITEM_SUCCESS:
      return {
        ...state,
        linkData: action.linkData,
      };

    case types.LOAD_SHARED_ITEM_FAILED:
      return {
        ...state,
        errorMessage: action.error.message,
      };

    case types.UPDATE_SHARED_LINK: {
      const applySecure = (datum) => {
        if (action.shareId === datum.shareId) {
          return {
            ...datum,
            secure: action.secure,
          };
        }

        return datum;
      };

      return {
        ...state,
        linkData: state.linkData.map(applySecure),
      };
    }

    default:
      return state;
  }
};
