/**
 * Handling login when offline has lots of steps so I thought it would be nice
 * to contain them all to this file. At a high level logging in while offline
 * we will store the number of attempts in AsyncStorage and time the user
 * out if they try more than 5 times in a 15 minute span.
 *
 * If the user gets timed out, we will store the time that they can try to log in
 * again in AsyncStorage. We are using AsyncStorage so that even if the user
 * closes and relaunches the app, their log in state will be persisted.
 *
 * **NOTE**: If the user logs out, or deletes/reinstalls the app, they will
 * need to log in via the API first
 */
import AsyncStorage from '@react-native-community/async-storage';

import Alert from '/overlay/Alert';

import api from '/api';
import { secureStorage, format } from '/util';

// How many invalid attempts before the user's account is locked?
const MAX_ATTEMPTS = 5;

// After MAX_ATTEMPTS tries, lock the users account for 15 minutes
const LOCKOUT_DURATION = 15 * 60 * 1000;

// This value will hold when the users account is unlocked
const TIMEOUT_KEY = 'TIMEOUT_UNTIL';
// Keep track of how many times the user tries to enter a password.
// We are storing this value in async storage so the user can't just
// close and re-launch the app.
const ATTEMPT_COUNT_KEY = 'ATTEMPT_COUNT_KEY';
// If the user tries to unlock their account 4 times, and then puts their
// phone down for 20 minutes, we don't want to lock them out. They should
// get to restart their attempt count after 15 minutes.
const ATTEMPT_TIME_KEY = 'ATTEMPT_TIME_KEY';

const STORAGE_KEYS = [TIMEOUT_KEY, ATTEMPT_COUNT_KEY, ATTEMPT_TIME_KEY];

// get the above values out of async storage
const readAsyncStorage = async () => {
  try {
    const [
      [, lockoutUntil],
      [, attemptCount],
      [, lastAttempt],
    ] = await AsyncStorage.multiGet(STORAGE_KEYS);

    return [
      JSON.parse(lockoutUntil),
      JSON.parse(attemptCount),
      JSON.parse(lastAttempt),
    ];
  } catch (e) {
    return [];
  }
};

const login = async (pinCode, onSuccess) => {
  const [lockoutUntil, attemptCount = 0, lastAttempt] = await readAsyncStorage();

  let attempts = attemptCount + 1;

  if (lockoutUntil) {
    // If the account is locked, we need to wait LOCKOUT_DURATION
    if (JSON.parse(lockoutUntil) > Date.now()) {
      Alert.error(api.userMessages.pin.tooManyTries);
      return;
    }
    // The user waited at least LOCKOUT_DURATION - let them try to login again
    await AsyncStorage.multiRemove(STORAGE_KEYS);
    attempts = 1;
  }

  // If the user hasn't entered their pincode in at least LOCKOUT_DURATION
  // let them try to login again
  if (lastAttempt && lastAttempt + LOCKOUT_DURATION < Date.now()) {
    attempts = 1;
  }

  if (attempts > MAX_ATTEMPTS) {
    Alert.error(api.userMessages.pin.tooManyTries);
    return;
  }

  // Update the attempt count and time of last account in AsyncStorage
  await AsyncStorage.multiSet([
    [ATTEMPT_COUNT_KEY, JSON.stringify(attempts)],
    [ATTEMPT_TIME_KEY, JSON.stringify(Date.now())],
  ]);

  let savedHash;

  // If the getPinCode call fails **or** succeeds but is null we will
  // show the user an error. We don't need to handle the error, we
  // will show the error down below
  try {
    savedHash = await secureStorage.getPinCode();
    // eslint-disable-next-line no-empty
  } catch (e) {}

  // If there is no hash saved in the keychain the user needs to first
  // login to the API before they can access offline data
  if (!savedHash) {
    Alert.error(api.userMessages.offline.needConnection);
    return;
  }

  const pin = format.encryptPinCode(pinCode);

  // The entered pin doesn't enter the one saved in the keychain
  if (pin !== savedHash) {
    Alert.error(api.userMessages.pin.invalidPin);

    // If the user has hit the MAX_ATTEMPTS we will set the lockout time in
    // AsyncStorage, and they will have to wait to try again
    if (attempts === MAX_ATTEMPTS) {
      const lockout = JSON.stringify(Date.now() + LOCKOUT_DURATION);
      await AsyncStorage.setItem(TIMEOUT_KEY, lockout);

      // Attempt count should start at 1 after the lockout is finished
      await AsyncStorage.multiRemove([ATTEMPT_COUNT_KEY, ATTEMPT_TIME_KEY]);
    }

    return;
  }

  // Phewf, Pin Code was correct!
  onSuccess();
  AsyncStorage.multiRemove(STORAGE_KEYS);
};

export default login;
