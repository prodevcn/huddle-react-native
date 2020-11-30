import React from 'react';
import { object } from 'yup';

import GenericForm from './GenericForm';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  { key: 'name', label: 'Name' },
];

const Other = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

Other.initialValues = {};

Other.fields = fields;

Other.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Other;
