import React from 'react';
import { object } from 'yup';

import DateInput from '/component/DateInput';
import GenericForm from './GenericForm';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  { key: 'name', label: 'Title' },
  { key: 'date', label: 'Date', Component: DateInput },
];

const Visit = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

Visit.initialValues = {};

Visit.fields = fields;

Visit.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Visit;
