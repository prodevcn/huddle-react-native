import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import HeaderButton from '/navigation/header/HeaderButton';
import SingleValueForm from '/partial/SingleValueForm';

import { actions, selectors } from '/state/folders';
import { actions as mixpanelActions } from '/state/mixpanel';
import validations from '/util/validations';

import Alert from '/overlay/Alert';
import api from '/api';

import * as editFolderEvents from '/constants/events/Folders/editFolder';
import * as createFolderEvents from '/constants/events/Folders/createFolder';
import keyboardManager from '/util/keyboardManager';

import screens from '/screen';

const FolderForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const folders = useSelector(selectors.allFoldersSelector);
  const existingFolderId = navigation.getParam('folderUniqueName');
  const existingFolder = folders[existingFolderId];
  const initialValue = existingFolder ? existingFolder.displayName : '';

  const update = async (values) => {
    dispatch(mixpanelActions.trackEvent(editFolderEvents.CLICK_UPDATE_FOLDER));

    try {
      const newFolder = {
        ...existingFolder,
        displayName: values.value,
      };
      await dispatch(actions.updateFolder(newFolder));
      navigation.dismiss();
    } catch (e) {
      if (e.status === api.errorCodes.FOLDER_NOT_FOUND) {
        Alert.error(api.userMessages.folder.notFound);
      } else if (e.status === api.errorCodes.FOLDER_USER_NOT_FOUND) {
        Alert.error(api.userMessages.folder.userNotFound);
      } else {
        Alert.showGenericError();
      }
    }
  };

  const create = async (values) => {
    dispatch(mixpanelActions.trackEvent(createFolderEvents.CLICK_CREATE_FOLDER));

    try {
      const folderUniqueName = await dispatch(actions.createFolder(values.value));
      navigation.push(screens.Folder, { folderUniqueName, dismissOnBack: true });
    } catch (e) {
      Alert.showGenericError();
    }
  };

  const handleSubmit = async (values) => {
    if (existingFolder) {
      return update(values);
    }

    return create(values);
  };

  return (
    <>
      <NavigationEvents
        onWillFocus={keyboardManager.disable}
        onDidFocus={keyboardManager.enable}
        onWillBlur={keyboardManager.enable}
      />
      <SingleValueForm
        title="What should we call this folder?"
        label="Eg: Vaccines"
        validation={validations.string}
        onSubmit={handleSubmit}
        maxLength={255}
        initialValue={initialValue}
      />
    </>
  );
};

FolderForm.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <HeaderButton icon="back" onPress={() => navigation.dismiss()} />,
});

export default FolderForm;
