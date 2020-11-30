/* eslint-env detox/detox, mocha */
const MockUserApi = require('../src/api/user.e2e');

const FIRST_NAME = 'Happy';
const LAST_NAME = 'User';
const MOBILE_NUMBER = '1112222211';
const DOB = '12121988';

describe('SignUp flow', () => {
  beforeAll(async () => {
    // Will relaunch app and cleanup AsyncStorage
    await device.relaunchApp({ delete: true });

    MockUserApi.signupLookupReset();
  });

  describe('Onboarding screen', () => {
    it('shows the welcome message', async () => {
      await expect(element(by.id('welcome-message'))).toBeVisible();
    });

    it('shows the logo', async () => {
      await expect(element(by.id('logo'))).toBeVisible();
    });

    it('shows "Get Started" button', async () => {
      await expect(element(by.id('get-started-button'))).toBeVisible();
    });

    it('should open "EnterPhone" screen when tapping on "Get Started" button', async () => {
      await element(by.id('get-started-button')).tap();
      await expect(element(by.id('welcome-message'))).toBeNotVisible();
      await expect(element(by.text('What is your mobile number?'))).toBeVisible();
    });
  });

  describe('EnterPhone screen', () => {
    beforeEach(async () => {
      await device.disableSynchronization();
    });

    afterEach(async () => {
      await device.enableSynchronization();
    });

    it('shows "Your mobile number" form', async () => {
      await expect(element(by.id('single-value-form'))).toBeVisible();
    });

    it('has option to use email address', async () => {
      await expect(element(by.id('use-email-address'))).toBeVisible();
    });

    it('should open "VerificationCodeForm" screen when inserting phone number and pressing "Continue" button', async () => {
      await element(by.id('single-value-form')).tap();
      await element(by.id('single-value-form')).typeText(MOBILE_NUMBER);
      await device.enableSynchronization();
      await element(by.id('continue')).tap();
    });
  });

  describe('VerificationCodeForm screen', () => {
    beforeEach(async () => {
      await device.disableSynchronization();
    });

    afterEach(async () => {
      await device.enableSynchronization();
    });

    it('should shows verification code form', async () => {
      await expect(element(by.id('verification-code-form'))).toBeVisible();
    });

    it('should insert verification code', async () => {
      await element(by.id('verification-code-form')).tap();
      await element(by.id('verification-code-form')).typeText('123456');
    });
  });

  describe('EnterPin screen', () => {
    it('shows EnterPinForm', async () => {
      await expect(element(by.id('enter-pin-form'))).toBeVisible();
    });

    it('shows PinForm inputs', async () => {
      await expect(element(by.id('pin-input'))).toBeVisible();
    });

    it('inserts PIN code', async () => {
      await element(by.id('enter-pin-form').withDescendant(by.id('pin1'))).typeText('1');
      await element(by.id('enter-pin-form').withDescendant(by.id('pin2'))).typeText('1');
      await element(by.id('enter-pin-form').withDescendant(by.id('pin3'))).typeText('1');
      await element(by.id('enter-pin-form').withDescendant(by.id('pin4'))).typeText('1');
      await element(by.id('enter-pin-form').withDescendant(by.id('pin5'))).typeText('1');
      await element(by.id('enter-pin-form').withDescendant(by.id('pin6'))).typeText('1');

      await device.enableSynchronization();
    });
  });

  describe('ConfirmPin screen', () => {
    it('shows EnterPinForm', async () => {
      await expect(element(by.id('confirm-pin-form'))).toBeVisible();
    });

    it('inserts PIN code for confirmation', async () => {
      await element(by.id('confirm-pin-form').withDescendant(by.id('pin1'))).typeText('1');
      await element(by.id('confirm-pin-form').withDescendant(by.id('pin2'))).typeText('1');
      await element(by.id('confirm-pin-form').withDescendant(by.id('pin3'))).typeText('1');
      await element(by.id('confirm-pin-form').withDescendant(by.id('pin4'))).typeText('1');
      await element(by.id('confirm-pin-form').withDescendant(by.id('pin5'))).typeText('1');
      await element(by.id('confirm-pin-form').withDescendant(by.id('pin6'))).typeText('1');

      await device.enableSynchronization();
    });
  });

  describe('EnterInfo screen', () => {
    it('shows form', async () => {
      await expect(element(by.id('enter-info-form'))).toBeVisible();
    });

    it('inserts First name', async () => {
      await element(by.id('first-name')).tap();
      await element(by.id('first-name')).typeText(FIRST_NAME);
    });

    it('inserts Last name', async () => {
      await element(by.id('last-name')).tap();
      await element(by.id('last-name')).typeText(LAST_NAME);
    });

    it('inserts Date of Birth', async () => {
      await element(by.id('dob')).tap();
      await element(by.id('dob')).typeText(DOB);
    });

    it('should open new screen when pressing "Continue" button', async () => {
      await element(by.id('enter-info-form-continue')).tap();
      await device.enableSynchronization();
    });
  });

  describe('Caregiver screen', () => {
    it('shows form', async () => {
      await expect(element(by.id('onboarding-caregiver-form'))).toBeVisible();
    });

    it('should open new screen when pressing "No thanks, just me" button', async () => {
      await element(by.id('caregiver-just-me')).tap();
    });
  });

  describe('ChooseProfile screen', () => {
    it('shows form', async () => {
      await expect(element(by.id('choose-profile-form'))).toBeVisible();
    });

    it('should open home screen when selecting profile', async () => {
      await element(by.id('profile')).tap();
    });
  });

  describe('Shows tutorial', () => {
    it('should skip tutorial when tapping on welcome message', async () => {
      await element(by.id('welcome-tutorial')).tap();
    });
  });

  describe('Profile screen', () => {
    it('opens Profile screen when tapping on user\'s avatar in the header', async () => {
      await element(by.id('user-menu')).tap();
    });

    it('should open User\'s settings when tapping on "Settings & preferences" button', async () => {
      await element(by.id('user-settings')).tap();
    });
  });

  describe('Settings screen', () => {
    it('should scroll to bottom', async () => {
      await element(by.id('user-settings')).scrollTo('bottom');
    });

    it('should show alert when tapping on "Logout" menu item', async () => {
      await element(by.id('logout-item')).tap();
    });

    it('should logout user when tapping on "Logout" button in dialog menu', async () => {
      await element(by.id('Logout')).tap();
    });

    it('shows the welcome message on Onboarding screen', async () => {
      await expect(element(by.id('user-settings'))).toBeNotVisible();
      await expect(element(by.id('welcome-message'))).toBeVisible();
    });
  });
});
