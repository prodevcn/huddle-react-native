import * as React from 'react';
import { View, ScrollView } from 'react-native';

import Text from '/component/Text';
import Badge from '/component/Badge';

import baseStyles from '../UIKit.styles';

const rowStyle = {
  marginBottom: 10,
  flexDirection: 'row',
};

const textStyle = {
  marginRight: 8,
};

export default () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={[baseStyles.contentContainer, { backgroundColor: '#efefef' }]}
    style={baseStyles.scrollView}
  >
    <View style={rowStyle}>
      <Text style={textStyle}>Add</Text>
      <Badge.Add />
    </View>
    <View style={rowStyle}>
      <Text style={textStyle}>Remove</Text>
      <Badge.Remove />
    </View>
    <View style={rowStyle}>
      <Text style={textStyle}>Count</Text>
      <Badge.Count count={3} />
    </View>
    <View style={rowStyle}>
      <Text style={textStyle}>Notification</Text>
      <Badge.Notification />
    </View>
    <View style={rowStyle}>
      <Text style={textStyle}>Badge</Text>
      <Badge icon="user" />
    </View>
  </ScrollView>
);
