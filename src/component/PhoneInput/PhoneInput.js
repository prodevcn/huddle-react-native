import React from 'react';

import TextInput from '/component/TextInput';

const PhoneInput = (props) => (
  <TextInput
    {...props}
    keyboardType="numeric"
    maskProps={{
      type: 'custom',
      options: {
        mask: '(999)-999-9999',
      },
    }}
  />
);

export default PhoneInput;
