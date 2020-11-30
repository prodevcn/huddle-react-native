export const getFlatContactList = (contactList) => {
  if (!contactList) {
    return undefined;
  }

  return contactList.reduce((list, item) => {
    const {
      givenName, familyName, emailAddresses, phoneNumbers,
    } = item;

    if (phoneNumbers.length) {
      phoneNumbers.map((phoneNumberItem) =>
        list.push({
          givenName,
          familyName,
          phoneNumber: phoneNumberItem.number,
        }));
    }

    if (emailAddresses.length) {
      emailAddresses.map((emailItem) =>
        list.push({
          givenName,
          familyName,
          email: emailItem.email,
        }));
    }

    return list;
  }, []);
};


export default getFlatContactList;
