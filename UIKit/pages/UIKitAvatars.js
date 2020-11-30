import * as React from 'react';
import { ScrollView } from 'react-native';

import styles from '../UIKit.styles';

import Avatar from '/component/Avatar';
import Text from '/component/Text';
import img from './base_64_image';

const style = {
  marginBottom: 16,
};

const textStyle = {
  marginBottom: 8,
};

const profiles = [
  { firstName: 'Camille', lastName: 'Garrigan', profileCode: '98afj' },
  { firstName: 'John', lastName: 'Garrigan', profileCode: '2u389' },
  { profileCode: '892u9' },
  {
    avatar: img,
    firstName: 'John',
    lastName: 'Garrigan',
    profileCode: 'a89sd',
  },
];

export default () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={styles.contentContainer}
    style={styles.scrollView}
  >
    {profiles.map((p) => (
      <Avatar profile={p} key={p.profileCode} style={style} />
    ))}
    <Text style={textStyle}>size=&quot;large&quot;</Text>
    {profiles.map((p) => (
      <Avatar profile={p} key={p.profileCode} style={style} size="large" />
    ))}
  </ScrollView>
);
