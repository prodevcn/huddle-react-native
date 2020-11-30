import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import globalStyles from '/styles';
import Button from './index';

const containerStyle = StyleSheet.create({
  container: {
    padding: globalStyles.padding.sm,
  },
});

const Container = ({ children }) => <View style={containerStyle.container}>{children}</View>;

storiesOf('Buttons', module).add('primary button', () => (
  <Container>
    <Button text="Primary button" />
  </Container>
));
