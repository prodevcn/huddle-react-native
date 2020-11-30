import { string } from 'yup';
import { parseISO } from 'date-fns';

import {
  date as dateMsg,
  email as emailMsg,
  phone as phoneMsg,
} from '/api/userMessages';

// todo danactive unit test

const phone = string()
  .trim()
  .matches(/^(\()?\d{3}(\))?(-|\s)?[2-9]{1}\d{2}(-|\s)\d{4}$/, { message: phoneMsg.invalid });

const email = string().email(emailMsg.invalid);

const date = string().test(
  'valid-date',
  dateMsg.invalid,
  (value) => {
    if (!value) return true;
    return value && parseISO(value) !== 'Invalid Date' && value.match(/\d\d\/\d\d\/\d\d\d\d/);
  },
);

// eslint-disable-next-line no-useless-escape
export const PHONE_NUMBER_REGEXP = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
export const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export default {
  phone,
  email,
  date,
  string: string().trim(),
};
