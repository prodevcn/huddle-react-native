# Changelog

## Develop

## 1.4.1

- [HD-688] Deleting shared profile does not remove that profile from the account it was shared to
- [HD-686] Escape input from public not internal sources
- [HD-689] Reset PIN Flow can be entered from offline mode
- [HD-702] Sentry - Disable on DEV; Add Sourcemap build step
- [HD-449] switching profiles while a photo is uploading causes an error message "file upload failed" when the photo uploads.
- [HD-674] Remove country code from phone number when user add new care team member
- [HD-684] Add Changelog
- [HD-692] Change copy on offline error messages
- Update dependencies
- Improve image caching
- Bump node to 12 version on NVM
- Quick fix for 'react-native-screens' package

## 1.4.0

- [HD-673] Hide PIN numbers after they have been entered
- [HD-569] Dismiss surveys nicer
- [HD-677] Sort Contact list alphabetically when inviting a care team member
- [HD-593] Remove AppCenter integration
- [HD-676] Fixed autofocus for 'VerificationCodeForm' form
- [HD-668] Cleanup unused fonts from iOS build
- [HD-567] Hide share profile tutorial on shared profile
- [HD-578] Deleting a Profile Causes Crash
- [HD-643] Ignore accessibility settings
- [HD-595] Mixpanel adds user properties for referrer
- [HD-644] Add option to pick file and attach it
- [HD-618] Take users from add other flow to Insurance flow when clicking insurance type
- Make sure the welcome tutorial shows up
- Log caught errors to Sentry
- Hide dashboard alerts in readonly
- PII Redaction
- Unhide folder share button
- Use a SwitchNavigator to show Home/Onboarding
- Add read-only offline mode

## 1.3.1

- [HD-546] Remove the back button from onboarding screens
- [HD-582] Only validate dates when changed with value
- Don't allow multiple presses during link onboarding flow
- Don't re-run item form validation
- Revert the rn-nodeify dependencies

## 1.3.0

- [HD-436] Workaround for 'react-native-contacts' on Android
- [HD-522] Allow documents to be shared from other apps to Add Item
- [HD-582] Update form validation styles
- [HD-598] Install Detox and add integration test for SignUp flow
- [HD-616] Do Not Allow Buttons to be Pressed Twice in Succession (with hooks)
- [HD-650] Change alias, identity to master profile code from userIdentifier
- Add a dashboard alert for user feedback
- Care Team: Allow Sync prompt to hide on button tap
- Log PROD only error in Mixpanel
- Update dependencies

## 1.2.0
- [HD-522] Allow documents to be shared from other apps to Add Item
- [HD-556] Adding items from action sheet will have a default name
- [HD-561] Adding Items With No Attachment Causes Notice To Say 'Document upload was Successful'
- [HD-590] Adjust Link Import med workflow so all boxes are pre-checked
- [HD-594] Change alias, identity to userIdentifier from login response
- [HD-597] Folders
- [HD-598] Setup and use 'react-native-testing-library'
- [HD-617] Allow delete/backspace on PIN input
- [HD-626] Integrate with SmartSearch 'Save selected med' API
- Display telephone number as North American Numbering Plan
- Use the ConfirmDialog in place of Alert.alert() across the app
- Update dependencies

## 1.1.1

- [HD-619] Make sure camera roll images show up
- Clear the inifinid token on logout
- Fix DOB error and add error code file
- Update custom object in User API to store enum not label

## 1.1.0

- [HD-323] Improve success alert
- [HD-436] Correct show contacts with no last name or with no first name
- [HD-477] Add 'optional' hint for 'Link to Patient Portal' field
- [HD-496] Replace SmartSearch with Huddle tool API
- [HD-506] New Item types not implemented or not implemented correctly, icons and hospitalization date fields
- [HD-527] Dismiss any overlays when deep linking
- [HD-537] Bypass given, family, DOB verification
- [HD-577] Controlling when to show a Mixpanel in-app message
- [HD-579] Inviting to Care Team Using Phone Number from Contacts Give Error "Phone Number Invalid"
- [HD-580] Cannot Sync Contacts in Staging on Android
- [HD-585] Caregiver is now able to import Health Summary from Link
- [HD-586] New prescriptions showing as Inactive medications in Huddle
- [HD-587] Hide 'No thanks, Just Me' from relationship screen during Link caregiver onboarding
- [HD-583] Text Input Automatically filled when adding an email
- [HD-614] Note Item Does Not Show After Creation
- Camera Fixes
- Never require the user to verify their info during password reset
- Handle expired jwt/validationCode2 tokens
- Use new icon name in health summary for condition
- Upgrade Cocoapods version in Gemfile
- Update dependencies

## 1.0.1

- [HD-426] Secure Sharing Showing as on When it is Off
- [HD-477] For fields that are optional, add "Optional" to their hint text
- [HD-507] Creating A New Profile Does Not Show A Manage Button Until Restart
- [HD-559] Link to Patient Portal Doesn't Open When Link Includes https://
- [HD-562] Change Landing Page to only have "Get Started" option
- [HD-566] Submitting a Ticket on a Account Registered to a Phone Number and Not an Email Causes Error

## 1.0.0

- [HD-557] Incorrect hint text when adding note content
- [HD-558] Create a Mixpanel event for inviting someone to Huddle
- Bugfixies

## 0.10.0

- [HD-276] Add Acknowledgements to Open Source licenses
- [HD-289] Force user to reset PIN after they've tried the incorrect PIN 5 times
- [HD-323] Send an invite to someone else - frontend
- [HD-326] BUG: Signing up with a second account brings user to preferences page instead of dashboard
- [HD-409] Hide certain functionality from CareTeamInvite profiles
- [HD-479] Change copy of 2 alerts
- [HD-480] After adding an item from the "Add Items" button, take user to the "Items" tab
- [HD-482] When adding an item, show the profile that the item is being added for and all the user to change the profile to any profiles they have edit access to
- [HD-483] Do not clear tutorial after user has gone through them
- [HD-509] Don’t make the “Save Item” button active until required fields are filled out
- [HD-510] Make phone number, address, and patient portal URL fields look clickable
- [HD-521] Add other should have a user add item type before opening "add item" page
- [HD-520] Change app font to Lato
- [HD-523] Add item page opens and immediately closes after Enter PIN when a file is sent and Huddle is closed
- [HD-525] Change PIN to be 6 digits instead of 4: frontend
- [HD-529] List a few items at the bottom of the Home page
- [HD-530] Adding Insurance From Health Summary Does Not Open Insurance Scanner 
- [HD-543] Add the word "Are" to this title
- [HD-545] Pre-populate email in Help Desk ticket, if user already had their email in their Huddle account
- [HD-553] General Feedback button
- [HD-554] Setup production environment

## 0.9.1

- [HD-499] Update Huddle TOU & Privacy Policy
- [HD-536] Add email to Help Desk ticket submission

## 0.9.0

- [HD-320] BUG: iOS asks for faceID when faceID is not enabled
- [HD-340] BUG: change email and phone number not working
- [HD-370] Update Insurance Card Scanner to go through Huddle backend
- [HD-452] Not sending proper session_id and patient_id to SmartSearch
- [HD-455] Health Summary showing "your health summary" for profile from care team invite
- [HD-461] Don't make the form entry requirements red, make them blue (so where it says "Date must be MM/DD/YYYY" or "Required" should be in the Huddle blue)
- [HD-462] Don't have the Last Name and DOB fields light up as red until they're entered
- [HD-463] Change "Phone Number must be 10 digits" to "Must be 10 digits"
- [HD-465] Update last page of onboarding
- [HD-466] Add legal text to the bottom of the "Can we help you take care of someone else?" screen
- [HD-467] Change prompt to enable FaceID or Fingerprint to system prompt
- [HD-469] Don't show the item type field when adding from Health Summary
- [HD-470] When adding a medication from the Health Summary, preset the status to "Active"
- [HD-471] After adding the item, take user back to the respective item list page within the Health Summary (for example, either "Insurance" or "Active Medications") instead of taking them back to the Home page
- [HD-472] Don't show meds with the status "Inactive" under "Active Medications"
- [HD-487] Add "Getting Started" to two dashboard alerts
- [HD-488] Change empty state of "Items" tab
- [HD-501] Mixpanel in-app messages - Android
- [HD-503] SurveyMonkey SDK integration - Android
- [HD-506] New Item Types Not Implemented Or Not Implemented Correctly
- [HD-515] Mixpanel in-app messages - iOS
- [HD-517] "Continue" on fields marked as "Big Free Text" stay grayed out after being edited
- [HD-526] SurveyMonkey SDK integration - iOS
- [HD-534] Handle JWT token

## 0.8.0

- [HD-266] BUG: Add a confirm prompt when a user tries to navigate away from the ItemForm
- [HD-327] Upload Files to create item
- [HD-328] New Item Types
- [HD-329] New Health Summary categories - allergies, vaccinations and immunizations, conditions

## 0.7.0

- [HD-169] Link user onboarding UI workflow
- [HD-170] Onboard as a person accepting an invitation to be a Care Team member: Frontend
- [HD-325] Add Note Item
- [HD-328] New Item Types
- [HD-331] Active Medication from Link Dashboard Alert
- [HD-361] BUG: Entering wrong verification code does not trigger an alert
- [HD-399] BUG: Items showing last update time, but sorting by created date
- [HD-409] Hide certain functionality from CareTeamInvite profiles
- [HD-414] BUG: Cannot remove care team members added by mobile
- [HD-419] Manage Sharing: Disable Button should ghost on uncheck
- [HD-446] Remove a Care Team member: Frontend
- Upgrade React-Native to 0.61.5

## 0.6.0

## 0.5.1

## 0.4.0

- Convert npm dependencies to AndroidX
- API integrations for Care Team flow

## 0.3.0

- Hello world :)
