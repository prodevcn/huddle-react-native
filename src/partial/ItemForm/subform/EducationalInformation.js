import React from 'react';
import { object } from 'yup';

import GenericForm from './GenericForm';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  { key: 'name', label: 'Title' },
];

const EducationalInformation = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

EducationalInformation.initialValues = {};

EducationalInformation.fields = fields;

EducationalInformation.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default EducationalInformation;
