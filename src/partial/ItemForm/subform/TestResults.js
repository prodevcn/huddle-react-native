import React from 'react';
import { object } from 'yup';

import GenericForm from './GenericForm';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  {
    key: 'name',
    label: 'Test Name',
  },
  {
    key: 'result',
    label: 'Result',
    placeholder: 'Enter your test results here...',
    type: GenericForm.TYPES.BIG_TEXT,
  },
];

const TestResults = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

TestResults.initialValues = {
  result: '',
};

TestResults.fields = fields;

TestResults.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default TestResults;
