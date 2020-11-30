import React from 'react';
import { object } from 'yup';

import GenericForm from './GenericForm';
import PhoneInput from '/component/PhoneInput';

import { validations } from '/util';
import { REQUIRED_LABEL, linkTypes } from '/constants/config';

const fields = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'specialty',
    label: 'Specialty',
  },
  {
    key: 'telephone',
    Component: PhoneInput,
    label: 'Telephone',
    linkType: linkTypes.tel,
  },
  {
    key: 'fax',
    Component: PhoneInput,
    label: 'Fax',
  },
  {
    key: 'address',
    label: 'Address',
    linkType: linkTypes.address,
  },
  {
    key: 'practice',
    label: 'Practice Name',
  },
  {
    key: 'patientPortal',
    label: 'Link to Patient Portal',
    linkType: linkTypes.url,
  },
];

const Provider = ({ formProps }) => (
  <GenericForm fields={fields} formProps={formProps} />
);

Provider.initialValues = {
  specialty: '',
  telephone: '',
  fax: '',
  address: '',
  practice: '',
  patientPortal: '',
};

Provider.fields = fields;

Provider.validationSchema = object().shape({
  name: validations.string.required(REQUIRED_LABEL),
});

export default Provider;
