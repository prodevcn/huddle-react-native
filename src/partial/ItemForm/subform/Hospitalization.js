import React from 'react';
import { object } from 'yup';

import GenericForm from './GenericForm';
import DateInput from '/component/DateInput';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  { key: 'name', label: 'Title' },
  {
    key: 'startDate',
    label: 'Start Date',
    Component: DateInput,
  },
  {
    key: 'endDate',
    label: 'End Date',
    Component: DateInput,
  },
];

const Hospitalization = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

Hospitalization.initialValues = {
  startDate: '',
  endDate: '',
};

Hospitalization.fields = fields;

Hospitalization.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Hospitalization;
