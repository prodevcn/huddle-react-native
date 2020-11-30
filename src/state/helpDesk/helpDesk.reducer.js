import * as types from './helpDesk.types';

const defaultState = {
  isLoading: false,
  error: false,
  email: '',
  issue: '',
  summary: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SUBMIT_TICKET:
      return {
        ...state,
        isLoading: true,
        issue: action.issue,
        email: action.email,
        summary: action.summary,
      };

    case types.SUBMIT_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        email: '',
        issue: '',
        summary: '',
      };

    case types.SUBMIT_TICKET_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default:
      return state;
  }
};
