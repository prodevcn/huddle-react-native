import * as types from './careTeam.types';

const defaultState = {
  isLoading: false,
  error: false,
  list: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH:
      return {
        ...state,
        isLoading: true,
      };

    case types.FETCH_SUCCESS:
      return {
        ...state,
        list: action.list,
      };

    case types.ADD:
      return {
        ...state,
        isLoading: true,
      };

    case types.ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
      };

    case types.ADD_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    case types.REMOVE:
      return {
        ...state,
        isLoading: true,
      };

    case types.REMOVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [
          ...state.list.filter((item) =>
            item.mobile !== action.contact.mobile || item.email !== action.contact.email),
        ],
      };

    case types.REMOVE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    case types.CLEAR_LIST:
      return defaultState;

    default:
      return state;
  }
};
