import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import Container from 'storybook/Container';
import Badge from './Badge';

const DefaultBadge = ({
  count, size, style, color,
}) =>
  (
    <Container>
      <Badge
        color={color}
        count={count}
        size={size}
        style={style}
      />
    </Container>
  );

storiesOf('Badge', module).add('badge', () => (<DefaultBadge count={5} size={25} color="purple" />));
