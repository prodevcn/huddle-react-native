import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Avatar from './Avatar';

const DefaultAvatar = ({ profile }) => (
  <Container>
    <Avatar
      profile={profile}
      size="large"
    />
  </Container>
);

storiesOf('Avatar', module).add('avatar', () => (
  <DefaultAvatar
    profile={{
      firstName: 'test',
      lastName: 'user',
    }}
  />
));
