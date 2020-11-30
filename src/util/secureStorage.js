import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import touchId from '/util/touchId';

const PIN = 'PIN';
const VALIDATION_CODE = 'VALIDATION_CODE';

const ACCESS = { accessible: ACCESSIBLE.WHEN_UNLOCKED };

class SecureStorage {
  setPin = (pinCode) => {
    this.pinCode = pinCode;
    return RNSecureKeyStore.set(PIN, pinCode, ACCESS);
  };

  setValidationCode = (code) => {
    this.validationCode = code;
    return RNSecureKeyStore.set(VALIDATION_CODE, code, ACCESS);
  };

  getValidationCode = async () => {
    try {
      const code = await RNSecureKeyStore.get(VALIDATION_CODE);
      this.validationCode = code;
      return code;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  getPinCode = async () => {
    try {
      const code = await RNSecureKeyStore.get(PIN);
      this.pinCode = code;
      return code;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  unlockWithTouchID = async () => {
    try {
      await touchId.authenticate();

      const [pinCode, code] = await Promise.all([
        RNSecureKeyStore.get(PIN),
        RNSecureKeyStore.get(VALIDATION_CODE),
      ]);

      if (!(pinCode && code)) throw new Error('Invalid storage state');

      this.pinCode = pinCode;
      this.validationCode = code;

      return { pinCode, code };
    } catch (e) {
      throw new Error(e.message);
    }
  };

  clearStorage = async () => {
    try {
      await Promise.all([
        RNSecureKeyStore.remove(PIN),
        RNSecureKeyStore.remove(VALIDATION_CODE),
      ]);
    } catch (e) {
      throw new Error(e);
    }
  };
}

export default new SecureStorage();
