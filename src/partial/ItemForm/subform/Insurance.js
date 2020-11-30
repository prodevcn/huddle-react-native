import React from 'react';
import { object } from 'yup';

import GenericForm from './GenericForm';

import { REQUIRED_LABEL } from '/constants/config';
import { validations } from '/util';

const fields = [
  { key: 'name', label: 'Insurance Name' },
  { key: 'memberId', label: 'Member ID' },
  { key: 'bin', label: 'Rx Bin' },
  { key: 'groupId', label: 'Group' },
  { key: 'pcn', label: 'Rx PCN' },
];

const Insurance = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

Insurance.initialValues = {
  memberId: '',
  bin: '',
  groupId: '',
  pcn: '',
};

Insurance.fields = fields;

Insurance.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Insurance;
