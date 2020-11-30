/**
 * The medication form is complicated enough that I think it shoudl be
 * its own component, instead of rendering a GenericForm
 */
import React from 'react';
import { object } from 'yup';
import { useDispatch } from 'react-redux';

import DateInput from '/component/DateInput';
import TextArea from '/overlay/ModalTextArea';
import ValueField from '/component/ValueField';
import MultilineValueField from '/component/MultilineValueField';
import ActionSheet from '/overlay/ActionSheet';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';
import screens from '/screen';

import { actions } from '/state/overlays';

import formStyles from '/partial/ItemForm/subform/form.styles';

const STATUS_VALUES = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

const fields = [
  { key: 'name', label: 'Medication name' },
  { key: 'instructions', label: 'Directions' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Start Date' },
];

const Medication = ({ formProps, navigation }) => {
  const { values, handleChange, errors } = formProps;
  const dispatch = useDispatch();

  const handleItemMedicationPress = () => {
    navigation.push(screens.AddItemPickMedication, {
      onChange: handleChange('name'),
      initialValue: values.name,
    });
  };

  const handleStatusPress = () => {
    dispatch(actions.show(ActionSheet, {
      data: STATUS_VALUES,
      initialValue: values.status,
      onChange: handleChange('status'),
    }));
  };

  const handleInstructionsPress = () => {
    dispatch(actions.show(TextArea, {
      onSubmit: (value) => handleChange('instructions')(value.value),
      value: values.instructions,
      placeholder: 'Write the instructions for this medication here...',
    }));
  };

  const statusValue = STATUS_VALUES.find((status) => status.value === values.status);
  const status = (statusValue && statusValue.label) || '';

  return (
    <>
      <ValueField
        error={errors.name}
        style={formStyles.field}
        value={values[fields[0].key]}
        label={fields[0].label}
        onPress={handleItemMedicationPress}
      />
      <MultilineValueField
        style={formStyles.field}
        value={values[fields[1].key]}
        label={fields[1].label}
        onPress={handleInstructionsPress}
        animateBlur
      />
      <ValueField
        style={formStyles.field}
        value={status}
        label={fields[2].label}
        onPress={handleStatusPress}
        animateBlur
      />
      <DateInput
        style={formStyles.field}
        value={values[fields[3].key]}
        label={fields[3].label}
        onChangeText={handleChange('date')}
      />
    </>
  );
};

Medication.initialValues = {
  date: '',
  status: '',
  instructions: '',
};

Medication.fields = fields;

Medication.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Medication;
