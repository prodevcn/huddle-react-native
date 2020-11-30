import React, { useMemo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import keys from 'lodash/keys';

import screens from '/screen';
import api from '/api';
import Alert from '/overlay/Alert';
import BottomButtonLayout from '/navigation/layout/BottomButtonLayout';
import BackgroundExtension from '/component/BackgroundExtension';
import AddImagesHeader from '/partial/ItemForm/subheader/AddImages';
import ReviewInsuranceHeader from '/partial/ItemForm/subheader/ReviewInsurance';
import PickImage from '/overlay/PickImage';
import { itemTypeLabels, itemTypes } from '/screen/Item/PickType';
import TextArea from '/overlay/ModalTextArea';
import * as events from '/constants/events/Items/addItem';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { actions as overlayActions } from '/state/overlays';
import { selectors as profileSelectors } from '/state/profiles';
import FormBackHandler from '/util/FormBackHandler';
import { format } from '/util';
import confirmBack from '/util/confirmBack';

import NoteField from '/partial/NoteField';
import Button from '/component/Button';
import ValueField from '/component/ValueField';

import formStyles from '/partial/ItemForm/subform/form.styles';
import subForms from '/partial/ItemForm/subform';
import ActionSheet from '/overlay/ActionSheet';

import useItemUpload from './ItemForm.hooks';
import useDeterminer from '/hook/useDeterminer';

import styles from './ItemForm.styles';
import { itemGalleryTypes } from '/constants/config';

const ItemForm = ({
  initialType,
  hideTypeField,
  initialImages = [],
  initialValues,
  onSubmit,
  navigation,
  buttonText = 'Save Item',
  generateName,
  showPickType,
  showProfilePicker,
  isEdit,
}) => {
  const initialProfileCode = useSelector(profileSelectors.currentProfileCodeSelector);
  const profiles = useSelector(profileSelectors.profilesSelector);
  const writeAccessProfiles = useSelector(profileSelectors.writeAccessProfilesSelector);

  const [type, setType] = useState(initialType);
  const [selectedProfile, setSelectedProfile] = useState(initialProfileCode);
  const dispatch = useDispatch();

  const handleItemTypePress = () => {
    dispatch(trackEvent(events.CLICK_ITEM_TYPE));

    navigation.push(screens.AddItemPickType, {
      onChange: setType,
    });
  };

  useEffect(() => {
    if (showPickType) {
      handleItemTypePress();
    }
  }, []);

  const {
    newDocs,
    docsToRemove,
    docs,
    addDoc,
    removeDoc,
  } = useItemUpload(initialImages);

  const SubForm = subForms[type] ? subForms[type] : View;

  // Every item should have a note and a name, even if they are empty
  const formInitialValues = {
    name: '',
    note: '',
    ...SubForm.initialValues,
  };

  const determiner = useDeterminer();
  let isReviewInsurance = false;

  // If we are provided initial values, match any of them up with the initialValues
  // that are defined on the SubForm
  if (initialValues) {
    isReviewInsurance = initialValues.photoGallery === itemGalleryTypes.reviewInsuranceCard;
    keys(formInitialValues).forEach((key) => {
      // If the initialValue is defined directly on the item we will add it,
      // otherwise we will look to see if it is defined in the `custom` hash
      if (initialValues[key]) {
        formInitialValues[key] = initialValues[key];
      } else if (initialValues.custom && initialValues.custom[key]) {
        formInitialValues[key] = initialValues.custom[key];
      }
    });

    // If we have any values that do not match names we can add them here
    if (initialValues.displayName) {
      formInitialValues.name = initialValues.displayName;
    }
  }

  if (type === itemTypes.other && !formInitialValues.name && generateName) {
    let defaultItemType = 'Item';
    if (initialImages && initialImages.length > 0) defaultItemType = 'Image';

    formInitialValues.name = `${defaultItemType} from ${format.toMmmDate(new Date())}`;
  }

  const Header = isReviewInsurance ? ReviewInsuranceHeader : AddImagesHeader;

  // If `validateOnMount` is true Formik will re-validate **with initialValues**
  // every update, unless the initialValues are memoized. I think the only time
  // we want the initial values to change are if the type changes
  const memoizedInitialValues = useMemo(() => formInitialValues, [type]);

  const handleItemAdded = () => {
    dispatch(trackEvent(events.CLICK_ADD_IMAGE));

    dispatch(overlayActions.show(PickImage, {
      navigation,
      onSelect: async (response) => {
        if (response.didCancel) return;

        if (response.error) {
          Alert.error(api.userMessages.camera.error);

          return;
        }

        addDoc({
          ...response,
          mimeType: 'image/jpeg',
          uploadId: (new Date()).getTime(),
        });
      },
    }));
  };

  const handleSubmit = (values, formActions) => {
    dispatch(trackEvent(events.CLICK_UPLOAD_ITEM));

    const {
      name,
      note,
      title,
      ...custom
    } = values;

    const data = {
      filename: name || title,
      note,
      custom: {
        ...custom,
        type,
      },
    };

    if (selectedProfile) {
      data.profileCode = selectedProfile;
    }

    const imageData = {
      add: newDocs,
      remove: docsToRemove,
    };

    onSubmit(data, imageData, formActions);
  };

  // Some fields live outside the formik state, so will not be reflected
  // in the render props's `dirty` value
  const isDirty = () => {
    const imagesChanged = newDocs.length || docsToRemove.length;
    const typeChanged = (isEdit && type && type !== initialType)
      || (formInitialValues.name && type === itemTypes.other);

    return imagesChanged || typeChanged;
  };

  // Only hide the type field if we have a type, and the calling screen wants
  // us to hide it. For example - when we are adding a Medication from the
  // HealthSummary screen or an insurance card we don't want to show the type.
  const showTypeField = !(type && hideTypeField);

  const showAssignee = showProfilePicker && writeAccessProfiles.length > 1;

  const currentProfile = profiles[selectedProfile] || {};
  const profileName = `${currentProfile.firstName} ${currentProfile.lastName}`;

  const handleProfilePress = () => {
    dispatch(overlayActions.show(ActionSheet, {
      data: writeAccessProfiles.map((profile) => ({
        label: `${profile.firstName} ${profile.lastName}`,
        value: profile.profileCode,
      })),
      onChange: setSelectedProfile,
      initialProfileCode: selectedProfile,
    }));
  };

  return (
    <Formik
      initialValues={memoizedInitialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      validateOnMount
      validationSchema={SubForm.validationSchema}
    >
      {(props) => {
        const dirty = isDirty() || props.dirty;
        const button = isReviewInsurance
          ? [
            <Button
              onPress={props.handleSubmit}
              text="Confirm and Save"
              loading={props.isSubmitting}
              key="confirmButton"
            />,
            <Button
              onPress={confirmBack(navigation)}
              text="Cancel"
              type="ghost"
              loading={props.isSubmitting}
              style={{ marginTop: 16 }}
              key="cancelButton"
            />,
          ] : (
            <Button
              text={buttonText}
              onPress={props.handleSubmit}
              loading={props.isSubmitting}
              disabled={!(dirty && props.isValid)}
            />
          );

        const handleNoteChange = (value) => {
          props.handleChange('note')(value.value);
        };

        const handleNotePress = () => {
          if (props.values.note) {
            dispatch(trackEvent(events.CLICK_EDIT_NOTE));
          } else {
            dispatch(trackEvent(events.CLICK_ADD_NOTE));
          }

          dispatch(overlayActions.show(TextArea, {
            onSubmit: handleNoteChange,
            value: props.values.note,
            placeholder: 'Write anything you\'d like about this item here...',
          }));
        };

        return (
          <BottomButtonLayout
            control={button}
            keyboardDismissMode="on-drag"
          >
            <FormBackHandler navigation={navigation} dirty={props.dirty} />
            <BackgroundExtension />
            <Header
              docs={docs}
              handleItemAdded={handleItemAdded}
              handleItemRemoved={removeDoc}
              navigation={navigation}
              determiner={determiner}
            />
            <View style={formStyles.form}>
              {!!showTypeField && (
                <ValueField
                  style={formStyles.field}
                  value={itemTypeLabels[type]}
                  label="Item Type"
                  onPress={handleItemTypePress}
                />
              )}
              <SubForm
                formProps={props}
                navigation={navigation}
                autoFocus={!isReviewInsurance}
              />
              {!!showAssignee && (
                <ValueField
                  style={formStyles.field}
                  value={profileName}
                  label="Profile"
                  onPress={handleProfilePress}
                  animateBlur
                />
              )}
              <NoteField
                note={props.values.note}
                onPress={handleNotePress}
                style={props.values.note && styles.notesBorder}
              />
            </View>
          </BottomButtonLayout>
        );
      }}
    </Formik>
  );
};

export default ItemForm;
