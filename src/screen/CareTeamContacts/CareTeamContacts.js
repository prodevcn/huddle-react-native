import React, { useState, useEffect } from 'react';
import {
  PermissionsAndroid,
  View,
  Platform,
  FlatList,
  Linking,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { useDispatch } from 'react-redux';

import screens from '/screen';
import globalStyles from '/styles';
import { store } from '/state/store';
import { selectors } from '/state/profiles';
import * as events from '/constants/events/InvitingToCareTeam/InvitingToCareTeam';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import {
  PHONE_NUMBER_REGEXP,
  EMAIL_REGEXP,
} from '/util/validations';
import { getFlatContactList } from '/util/getFlatContactList';
import { sort } from '/util';
import SearchInput from '/component/SearchInput';
import ListItem from '/component/ListItem';
import EmptyResults from './EmptyResults';
import styles from './CareTeamContacts.styles';
import AskPermission from '/partial/AskPermission';

const CareTeamContacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [allowAccess, setAllowAccess] = useState(false);
  const [showSyncRequest, setShowSyncRequest] = useState(false);
  const [showDirectContact, setShowDirectContact] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const dispatch = useDispatch();

  const checkPermissions = () => {
    if (Platform.OS === 'ios') {
      // works only for iOS
      Contacts.checkPermission((_err, permission) => {
        if (permission === 'authorized') {
          setAllowAccess(true);
        }
      });
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        .then((result) => {
          if (result) {
            setAllowAccess(true);
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.warn(err));
    }
  };

  const getAllContacts = () =>
    Contacts.getAll((_err, contactList) => {
      setContacts(getFlatContactList(contactList));
    });

  // eslint-disable-next-line consistent-return
  const handleContactsSync = async () => {
    dispatch(trackEvent(events.CLICK_SYNC_CONTACTS));

    if (allowAccess) {
      return getAllContacts();
    }

    if (Platform.OS === 'ios') {
      Contacts.requestPermission((err, permission) => {
        if (err || permission === 'denied') {
          Linking.openSettings();
        }

        if (permission === 'authorized') {
          setAllowAccess(true);
        }
      });
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setAllowAccess(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(err);
    }
  };

  const handleNoThanksPress = () => {
    setShowSyncRequest(false);
    dispatch(trackEvent(events.CLICK_NOT_SYNC));
  };

  const search = (text) => {
    if (text || PHONE_NUMBER_REGEXP.test(text) || EMAIL_REGEXP.test(text)) {
      const newFilteredContacts = contacts.filter(
        ({
          givenName = '',
          familyName = '',
          email = '',
          phoneNumber = '',
        }) => {
          const valueForRegexp = text
            .replace(/\W/gi, '')
            .replace(/\+/gi, '')
            .replace(/ /g, '');

          const regexp = new RegExp(valueForRegexp, 'i');

          return (
            regexp.test(`${givenName}${familyName}`)
            || regexp.test(`${familyName}${givenName}`)
            || regexp.test(givenName)
            || regexp.test(familyName)
            || regexp.test(email)
            || regexp.test(phoneNumber.replace(/[^\d]+/g, ''))
          );
        },
      );

      setFilteredContacts(newFilteredContacts);
    } else {
      setFilteredContacts([]);
    }
  };

  const handleSearchChange = (text) => {
    setSearchValue(text);
    search(text);
  };

  const handleContactPress = (contact) => () => {
    if (EMAIL_REGEXP.test(contact)) {
      dispatch(trackEvent(events.SELECTED_EMAIL_ADDRESS));
    } else {
      dispatch(trackEvent(events.SELECTED_PHONE_NUMBER));
    }

    navigation.push(screens.CareTeamConfirm, { contact });
  };

  const makeContactLabel = (givenName, familyName) => {
    if (givenName === familyName) {
      return `Invite ${givenName || ''}`;
    }

    return `Invite ${givenName || ''} ${familyName || ''}`;
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  useEffect(() => {
    if (allowAccess) {
      getAllContacts();
    }

    setShowSyncRequest(!allowAccess);
  }, [allowAccess]);

  useEffect(() => {
    if (PHONE_NUMBER_REGEXP.test(searchValue) || EMAIL_REGEXP.test(searchValue)) {
      setShowDirectContact(true);
    } else {
      setShowDirectContact(false);
    }
  }, [searchValue]);

  const showInitialList = !filteredContacts.length && !searchValue;
  const showFilteredList = !!filteredContacts.length && !!searchValue;

  let data = [];

  if (showFilteredList) {
    data = sort.manageContacts(filteredContacts);
  } else if (showInitialList) {
    data = sort.manageContacts(contacts);
  }

  return (
    <View style={styles.content}>
      <SearchInput
        value={searchValue}
        onChangeText={handleSearchChange}
        style={styles.input}
        placeholder="Type a name, email or number"
      />

      {!!showDirectContact && (
        <ListItem
          icon="mail"
          label={`Invite ${searchValue}`}
          squarePreview
          actionSymbolName="none"
          iconWrapperStyle={styles.directContactIcon}
          iconProps={{ color: globalStyles.palette.white }}
          onPress={handleContactPress(searchValue)}
        />
      )}

      {showSyncRequest && (
        <AskPermission
          onConfirmPress={handleContactsSync}
          onCancelPress={handleNoThanksPress}
          title="Connecting your contacts makes it easier to invite to Huddle."
          confirmText="Sync Contacts"
        />
      )}

      {allowAccess && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              icon="send1"
              label={makeContactLabel(item.givenName, item.familyName)}
              description={item.phoneNumber || item.email}
              squarePreview
              actionSymbolName="none"
              onPress={handleContactPress(item.phoneNumber || item.email)}
            />
          )}
          numColumns={1}
          contentContainerStyle={styles.list}
          keyExtractor={(_item, idx) => idx.toString()}
          ListFooterComponentStyle={styles.listFooter}
          ListEmptyComponent={() => !showDirectContact && <EmptyResults />}
        />
      )}

    </View>
  );
};

CareTeamContacts.navigationOptions = () => {
  // We need the determiner outside of a class, so the best I could think was to just
  // manually fetch it from the selector. By the time we get to this screen it should
  // be set in the redux store
  const determiner = selectors.determinerSelector(store.getState());

  return {
    title: `Invite to ${determiner} Care Team`,
  };
};

export default CareTeamContacts;
