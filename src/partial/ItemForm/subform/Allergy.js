import React from 'react';
import { object } from 'yup';

import DateInput from '/component/DateInput';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

import GenericForm from './GenericForm';

const fields = [
  { key: 'name', label: 'Allergy Name' },
  { key: 'reaction', label: 'Reaction' },
  { key: 'severity', label: 'Severity' },
  { key: 'date', label: 'Noted Date', Component: DateInput },
];

const Allergy = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

Allergy.initialValues = {
  reaction: '',
  severity: '',
  date: '',
};

Allergy.fields = fields;

Allergy.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Allergy;
