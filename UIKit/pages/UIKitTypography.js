import * as React from 'react';
import { ScrollView } from 'react-native';

import Text from '/component/Text';

import baseStyles from '../UIKit.styles';

const style = {
  marginBottom: 20,
};

export default () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={baseStyles.contentContainer}
    style={baseStyles.scrollView}
  >
    <Text.H1 style={style}>Heading xLarge</Text.H1>
    <Text.H2 style={style}>Heading xLarge</Text.H2>
    <Text.H3 style={style}>Heading xLarge</Text.H3>
    <Text.H4 style={style}>Heading xLarge</Text.H4>
    <Text.H5 style={style}>Heading xLarge</Text.H5>
    <Text style={style}>Body Default</Text>
    <Text style={style} weight="medium">
      Body Medium Weight
    </Text>
    <Text style={style} weight="semibold">
      Body Semibol Weight
    </Text>
    <Text.BodySmall style={style}>Body Small</Text.BodySmall>
    <Text.Row style={style} weight="medium">
      Row Title
    </Text.Row>
    <Text.Row style={style}>Row Title</Text.Row>
    <Text.Label style={style}>Input Label</Text.Label>
    <Text underline style={style}>Text underline</Text>
  </ScrollView>
);
