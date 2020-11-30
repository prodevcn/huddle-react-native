/* eslint-disable import/prefer-default-export */
import api from './serverAgent';

const RESOURCE = 'jira';

/**
 * @param {{ summary: string, description: string }} payload
 */
export const submit = (payload) => api.post(RESOURCE, 'submit', payload);
