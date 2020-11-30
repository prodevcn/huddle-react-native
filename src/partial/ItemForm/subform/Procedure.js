import React from 'react';
import { object } from 'yup';

import DateInput from '/component/DateInput';
import GenericForm from './GenericForm';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  { key: 'name', label: 'Procedure name' },
  {
    key: 'diagnoses',
    label: 'Associated Diagnoses',
    type: GenericForm.TYPES.BIG_TEXT,
    placeholder: 'Enter your associated diagnoses...',
  },
  {
    key: 'datePerformed',
    label: 'Date performed',
    Component: DateInput,
  },
];

const Procedure = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

Procedure.initialValues = {
  diagnoses: '',
  datePerformed: '',
};

Procedure.fields = fields;

Procedure.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Procedure;
