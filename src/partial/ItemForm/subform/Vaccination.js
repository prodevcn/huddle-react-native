import React from 'react';
import { object } from 'yup';

import DateInput from '/component/DateInput';
import GenericForm from './GenericForm';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  { key: 'name', label: 'Vaccination or Immunization name' },
  { key: 'occuranceDate', label: 'Occurrence date', Component: DateInput },
  { key: 'expirationDate', label: 'Expiration date', Component: DateInput },
];

const Vaccination = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

Vaccination.initialValues = {
  occuranceDate: '',
  expirationDate: '',
};

Vaccination.fields = fields;

Vaccination.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Vaccination;
