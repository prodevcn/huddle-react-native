/* eslint-disable import/prefer-default-export */

const USER_IDENTIFIER = 'HAPPY_USER_1999-12-12';
const FIRST_NAME = 'Happy';
const LAST_NAME = 'User';
const PROFILE_CODE = '2f9686c2-c82a-42a7-97a8-8585d4f9992b';
const MOBILE_NUMBER = '1112222211';

let mockLookupResponse;

const signupLookupResponse = {
  suggestion: [],
};

const loginLookupResponse = {
  status: {
    code: '060-01-0001',
    message: `Account for (mobile: ${MOBILE_NUMBER}) already exists.`,
  },
};

export function signupLookupReset() {
  mockLookupResponse = { ...signupLookupResponse };
}

export function loginLookupReset() {
  mockLookupResponse = { ...loginLookupResponse };
}

// SignUp flow
export const lookup = () => Promise.resolve(mockLookupResponse);

export const getVerificationCode = () => {
  const response = {
    validationCode: 'ZVdwWHZHbzJmNlByWGNSNGtzc0VVSG9DK29CS2VjdmQ5MkQ5Z1loUzJMYS9GTFZhT1o5c09HK1NnY01sejQrZGgrdzgxdExPcVNsWitlOG9YNDJHbllMN25Qb0o1T2h3cW9sRDRqOTEyZ3ZrTHNody9QYzBXYU54dDZ3SzROeXhFR0k1QzYza1B4WkhFQlA4Wkxhd1hkSDdGWVgvaHR3cg==',
  };

  return Promise.resolve(response);
};

export const verify = () => {
  const response = {
    validationCode: 'V3VNWGRtaGpGREo0b3orWTRsM3MydVV0TUJ2V1hhWTlpVHA0V3VTZ2tyOHRSUjZVcVF5UE9Fd2JlV2hBQ1BsZ1NJdERkSENLVWJZPQ==',
  };

  return Promise.resolve(response);
};

export const getCareInviter = () => {
  const response = {
    careTeamInviterList: [],
  };

  return Promise.resolve(response);
};

export const register = () => {
  const response = {
    userIdentifier: USER_IDENTIFIER,
    profileCode: PROFILE_CODE,
    profileType: 'Normal',
  };

  return Promise.resolve(response);
};

export const login = () => {
  const response = {
    userIdentifier: USER_IDENTIFIER,
    profile: [
      {
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        avatar: '',
        profileCode: PROFILE_CODE,
        custom: '',
        master: true,
        dob: '1988-12-12',
        profileType: 'Normal',
      },
    ],
    folder: [],
    document: [],
    termOfUsage: '2019v1',
    privacyPolicy: '2019.01.25',
    custom: null,
    jwtString: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
    email: null,
    mobile: MOBILE_NUMBER,
  };

  return Promise.resolve(response);
};
