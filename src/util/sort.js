import orderBy from 'lodash/orderBy';

const manageSharing = (data) => orderBy(data, ['deletedRaw', 'createdRaw'], ['desc', 'desc']);
const manageContacts = (data) => orderBy(data, ['givenName', 'familyName'], ['asc', 'asc']);

export default {
  manageSharing,
  manageContacts,
};
