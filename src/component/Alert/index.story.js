import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Alert from './Alert';

const DefaultAlert = ({ title, description }) => (
  <Container>
    <Alert
      title={title}
      description={description}
      type="general"
      style={{ marginBottom: 30 }}
    />
    <Alert
      title={title}
      description={description}
      type="warning"
      style={{}}
    />
  </Container>
);

storiesOf('Alert', module).add('alert', () => (
  <DefaultAlert
    title="Title"
    description="Description"
  />
));
