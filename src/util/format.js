import sha256 from 'crypto-js/sha256';
import { lightFormat } from 'date-fns';

/**
 * This function will convert a date string from the format
 * we are using in the app (`MM/DD/YYYY`) into the format the
 * API is expecting (`YYYY-DD-MM`)
 *
 * @param {string} value
 */
const appDateToAPIDate = (value) => {
  const [MM, DD, YYYY] = value.split('/');
  return `${YYYY}-${MM}-${DD}`;
};

/**
 * Convert a date in the format the API uses (YYYY-MM-DD) to a JS
 * Date object that we will be able to use with date-fns
 *
 * @param {string} value
 */
const APIDateToDate = (value) => {
  const [YYYY, MM, DD] = value.split('-');
  // Month is 0 based: Jan = 0, Feb = 1, etc. But we are storing dates
  // how we would write them: Jan = 1, Feb = 2, etc.
  return new Date(YYYY, MM - 1, DD);
};

/**
 * Convert a string date to a date object
 * @param {string} date
 * @returns {date}
 */
const toDate = (date) => ((date === null) ? null : new Date(date));

/**
 * Format date to MMM d, YYYY (i.e. Aug 29, 2019)
 * https://date-fns.org/v2.0.1/docs/lightFormat
 * @param {string} date timestamp
 * @returns {string} MMM date
 */
const toMmmDate = (date) => {
  if (!date) return null;
  // lightFormat does not support MMM (`format` supports but code splitting smaller)
  const parts = lightFormat(new Date(date), 'M-d, yyyy').split('-');
  const months = [
    'one-index',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[parts[0]]} ${parts[1]}`;
};

/**
 * Format date to 12-hour time (i.e. 12:01pm)
 * https://date-fns.org/v2.0.1/docs/lightFormat
 * @param {string} stamp date timestamp
 * @returns {string}
 */
const toTime = (date) => lightFormat(new Date(date), "h:mmaaaaa'm");

/**
 * Format date to relative date (i.e. Today, 2 months ago)
 * @param {string} stamp date timestamp
 * @param {date} compareDate for unit testing
 * @returns {string} relative date
 */
const toRelativeDate = (stamp, compareDate = new Date()) => {
  const date = new Date(stamp);
  const secDiff = ((compareDate.getTime() - date.getTime()) / 1000); // convert to second
  const dayDiff = Math.floor(secDiff / 86400);

  if (Number.isNaN(dayDiff) || dayDiff < 0) {
    return '';
  }

  const lessThanDay = (
    (secDiff < 60 && 'just now')
    || (secDiff < 120 && '1 minute ago')
    || (secDiff < 3600 && `${Math.floor(secDiff / 60).toString()} minutes ago`)
    || (secDiff < 7200 && '1 hour ago')
    || (secDiff < 86400 && `${Math.floor(secDiff / 3600).toString()} hours ago`)
  );

  return (dayDiff === 0 && lessThanDay)
    || (dayDiff === 1 && 'Yesterday')
    || (dayDiff < 7 && `${dayDiff.toString()} days ago`)
    || (dayDiff === 7 && '1 week ago')
    || (dayDiff < 30 && `${Math.ceil(dayDiff / 7).toString()} weeks ago`)
    || ((dayDiff === 30 || dayDiff === 31) && '1 month ago')
    || (dayDiff >= 30 && `${Math.ceil(dayDiff / 30).toString()} months ago`);
};

/**
 * This function will convert a phone number from the input that
 * the user enters (`(250)-592-1234`) to the format the API is
 * expecting (`2505921234`)
 * @param {string} value
 * @param {boolean} applyFormat converts from 2505921234 to (250)-592-1234
 */
const phone = (value, applyFormat) => {
  if (!value.replace) {
    return value;
  }

  if (applyFormat === true) {
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
  }

  return value.replace(/\D/g, '');
};

/**
 * The full 10 digits are called a line number
 * This function will reduce US country code (+1)
 * @param {string} phoneNumber
 */
const getLineNumber = (phoneNumber) => {
  if (phoneNumber.length === 10) {
    return phoneNumber;
  }

  return phoneNumber.replace(/^(1|\+1)/, '');
};

/**
 * Given a first and last name return the user's initials, capitalized
 *
 * @param {string} firstName
 * @param {string} lastName
 */
const getInitials = (firstName = '', lastName = '') => {
  const char1 = firstName ? firstName[0] : '';
  const char2 = lastName ? lastName[0] : '';
  return `${char1}${char2}`.toUpperCase();
};

/**
 * Given a pincode, encrypt it to sha256
 * @param {string} code
 */
const encryptPinCode = (code) => sha256(code).toString();

export default {
  APIDateToDate,
  appDateToAPIDate,
  encryptPinCode,
  getInitials,
  getLineNumber,
  phone,
  toDate,
  toMmmDate,
  toRelativeDate,
  toTime,
};
