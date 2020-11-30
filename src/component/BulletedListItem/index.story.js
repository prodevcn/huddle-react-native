import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import BulletedListItem from './BulletedListItem';
import Text from '/component/Text';

const DefaultBulletedListItem = () => (
  <Container>
    <BulletedListItem>
      <Text color="medium">
        List Item 1
      </Text>
    </BulletedListItem>

    <BulletedListItem>
      <Text color="medium">
        List Item 2
      </Text>
    </BulletedListItem>

    <BulletedListItem>
      <Text color="medium">
        List Item 3
      </Text>
    </BulletedListItem>

    <BulletedListItem>
      <Text color="medium">
        List Item 4
      </Text>
    </BulletedListItem>
  </Container>
);


storiesOf('BulletedListItem', module).add('BulletedListItem', () => (<DefaultBulletedListItem />));
