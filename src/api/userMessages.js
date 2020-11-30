// ================
// Form Field Errors
// ================
export const phone = {
  invalid: 'Must be 10 digits',
  taken: 'That phone number is already taken',
};

export const email = {
  invalid: 'Invalid Email',
  taken: 'That email is already taken',
};

export const date = {
  invalid: 'Date must be MM/DD/YYYY',
};

// ================
// Alert Messages
// ================
export const regist = {
  failed: {
    title: 'Registration failed',
    description: 'There was an error creating your account',
  },
};

export const registProfile = {
  failed: {
    title: 'Profile creation failed',
    description: 'There was an error adding this profile',
  },
};

export const updateProfile = {
  success: {
    title: 'Success!',
    description: 'This profile was updated',
  },
  notInCareTeam: {
    title: 'You cannot edit this profile',
    description: 'You are trying to edit a profile that is not in your care team',
  },
};

export const deleteProfile = {
  success: {
    title: 'The profile is successfully deleted',
  },
  error: {
    title: 'Cannot remove this profile',
  },
};

export const caregiversActions = {
  remove: {
    success: {
      title: 'The user is successfully removed',
    },
    error: {
      title: 'Cannot remove this user',
    },
  },
};

export const inviteSomeone = {
  cancel: { title: 'Invite Someone Dismissed' },
  error: {
    title: 'Invite Someone Failed',
    description: 'Unable to generate send message',
  },
  success: {
    generic: 'Invite created',
  },
};

export const careTeamInvite = {
  invalidPhone: {
    title: 'Invalid phone number',
    description: 'Please check to make sure the mobile number you entered is correct',
  },
  /**
   * @param {'email' | 'phone'} type
   */
  cantInviteYourself: (type) => ({
    title: 'You cannot invite yourself',
    description: `That ${type} is registered to this account`,
  }),
};

export const sharingShare = {
  cancel: { title: 'Secure Link Dismissed' },
  error: {
    title: 'Secure Link Share Failed',
    description: 'Unable to generate secure link',
  },
  errorOwnership: {
    title: 'Secure Link Share Failed',
    description: 'Cannot share item you do not own',
  },
  success: {
    clipboard: 'Secure Link Copied to Clipboard',
    generic: 'Secure Link Shared',
  },
};

export const sharingUnshare = {
  error: {
    title: 'Try again later',
  },
  success: {
    title: 'Disabled',
    description: 'Shared Link is disabled',
  },
};

export const pin = {
  invalidCredentials: {
    title: 'Could not reset your pin',
    description: 'Your credentials were not correct',
  },
  mismatch: {
    title: 'Could not reset your pin',
    description: 'The pins your entered did not match',
  },
  invalidPin: {
    title: 'Could not log you in',
    description: 'Invalid Pin',
  },
  invalidCurrentPin: {
    title: 'Invalid Pin',
  },
  tooManyTries: {
    title: 'Too many attempts',
    description: 'You have entered the wrong credentials too many times. Try again in 15 minutes',
  },
};

export const itemDelete = {
  failed: {
    title: 'Could not delete this item',
    description: 'Please try again',
  },
  success: {
    title: 'This item has been deleted',
  },
  notFound: {
    title: 'Could not delete this item',
    description: 'This item could not be found',
  },
  confirm: {
    title: 'Are you sure you want to delete this item?',
    description: 'Once deleted, this record cannot be recovered and all shared access will be revoked.',
  },
};

export const login = {
  tooManyTries: {
    title: 'Too many attempts',
    description: 'You have been locked out of your account. Would you like to reset your pin?',
  },
  expiredSession: {
    title: 'Your session has expired',
    description: 'Please login again to re-validate your account',
  },
  error: {
    title: 'We could not log you in',
    description: 'Please try again',
  },
};

export const logout = {
  failed: {
    title: 'We could not log you out',
    description: 'Please try again',
  },
  confirm: {
    title: 'Confirm Logout',
    description: 'For your security, we wipe all your account data from this device when you logout.\n\nYou can sign in again at any time to reload your data.',
  },
};

// todo toadums this is a placeholder
export const upload = {
  failed: {
    title: 'Could not upload the file',
    description: 'Please try again',
  },
  success: {
    title: 'Item saved',
    description: 'The item was successfully saved. Tap here to view it',
  },
  noteUploadSuccess: {
    title: 'Note saved',
    description: 'The note was successfully saved.',
  },
  successWithUpload: {
    title: 'Item created',
    description: 'Your files are uploading in the background. Tap here to see progress',
  },
  imageUploadFailed: {
    title: 'File upload failed',
    description: 'We could not upload your files, tap here to try again',
  },
  imageUploadComplete: {
    title: 'Fle upload complete',
    description: 'Your file was successfully saved',
  },
  readOnlyActiveProfile: {
    title: 'You have view-only access',
    description: 'You have view-only access to this profile and cannot add items',
  },
  invalidMimeType: {
    title: 'Image upload failed',
    description: 'Invalid mimeType',
  },
};

export const updateDocument = {
  failed: {
    title: 'Could not update that item',
    description: 'Please try again',
  },
  success: {
    title: 'Item update successful',
    description: 'The item was successfully updated',
  },
  successWithUpload: {
    title: 'Item updated',
    description: 'Files are uploading in the background',
  },
};

export const camera = {
  error: {
    title: 'Could not take picture',
    description: 'Please try again',
  },
  permission: {
    title: 'Permission to use camera',
    description: 'Allow Huddle to access your camera so you can take photos',
    buttonPositive: 'Ok',
    buttonNegative: 'Cancel',
  },
  thumbnailError: {
    title: 'Could not generate a thumbnail',
    description: 'Please try again',
  },
};

export const avatar = {
  uploadSuccess: {
    title: 'Success!',
    description: 'Your avatar was updated',
  },
  uploadError: {
    title: 'Could not update your avatar',
    description: 'Please try again',
  },
};

// In case of emergency: break glass and show this error
export const generic = {
  title: 'Something went wrong',
  description: 'We could not do that at this time',
};

export const verificationCode = {
  invalidVerificationCode: {
    title: 'Invalid verification code',
  },
};

export const tutorials = {
  resetSuccess: {
    title: 'Tutorials have been reset',
    description: 'Go to the home screen to view your tutorials',
  },
};

export const scanInsurance = {
  missingCameraRef: {
    title: 'Add your insurance',
    description: 'Please enter your insurance card details due to missing camera',
  },
  missingSecret: {
    title: 'Add your insurance',
    description: 'Please enter your insurance card details due to configuration',
  },
};

export const downloadImage = {
  error: {
    title: 'Could not load image',
    description: 'Tap here to try again',
  },
};

export const linking = {
  cannotOpen: {
    title: 'We cannot open that link',
  },
};

export const downloadDoc = {
  error: {
    title: 'Could not download that document',
    description: 'Tap here to try again',
  },
};

export const document = {
  cannotOpen: {
    title: 'Cannot open that file',
    description: 'You do not have an application installed on your phone to open this file type',
  },
};

export const form = {
  confirmNavigation: {
    title: 'You have unsaved changes',
    description: 'Your changes will be lost, are you sure you would like to leave?',
  },
};

export const folderDelete = {
  failed: {
    title: 'Could not delete this folder',
    description: 'Please try again',
  },
  success: {
    title: 'This folder has been deleted',
  },
  notFound: {
    title: 'Could not delete this folder',
    description: 'This folder could not be found',
  },
  confirm: {
    title: 'Are you sure you want to delete this folder?',
    description: 'Once deleted, this record cannot be recovered and all shared access will be revoked.',
  },
};

export const folders = {
  notFound: {
    title: 'Folder not found',
  },
  userNotFound: {
    title: 'Invalid user',
  },
  invalidPath: {
    title: 'Invalid folder location',
  },
  recursivePath: {
    title: 'A Folder cannot be put in itself',
  },
};

export const offline = {
  needConnection: {
    title: 'You cannot do this while offline',
    description: 'Please connect to the internet to try this again',
  },
  fileNotSavedLocally: {
    title: 'This file is not saved on your device',
    description: 'Tap on this file while connected to the internet to save it to your device',
  },
};

export const survey = {
  cannotShow: {
    title: 'Could not load survey',
    description: 'Please try again',
  },
};
