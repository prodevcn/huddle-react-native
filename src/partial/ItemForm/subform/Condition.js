import React from 'react';
import { object } from 'yup';

import GenericForm from './GenericForm';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  { key: 'name', label: 'Condition Name' },
];

const Condition = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

Condition.initialValues = {};

Condition.fields = fields;

Condition.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Condition;
