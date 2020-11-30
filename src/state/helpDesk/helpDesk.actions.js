/* eslint-disable import/prefer-default-export */
import api from '/api';
import * as types from './helpDesk.types';

export const submitTicket = ({ issue, email, summary = 'Other' }) => async (dispatch) => {
  try {
    dispatch({
      type: types.SUBMIT_TICKET,
      issue,
      email,
      summary,
    });

    await api.helpdesk.submit({ description: issue, email, summary });

    dispatch({ type: types.SUBMIT_TICKET_SUCCESS });
  } catch {
    dispatch({ type: types.SUBMIT_TICKET_FAILED });
  }
};
