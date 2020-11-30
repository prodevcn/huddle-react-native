import React from 'react';
import { object } from 'yup';

import GenericForm from './GenericForm';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  { key: 'name', label: 'Name' },
];

const CareDocument = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

CareDocument.initialValues = {};

CareDocument.fields = fields;

CareDocument.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default CareDocument;
