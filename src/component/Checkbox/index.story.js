import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Checkbox from './Checkbox';

const DefaultCheckBox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Container>
      <Checkbox
        label="Sample Text"
        checked={checked}
        onChange={setChecked}
      />
    </Container>
  );
};

storiesOf('CheckBox', module).add('checkbox', () => (
  <DefaultCheckBox />
));
