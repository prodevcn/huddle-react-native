import * as React from 'react';
import { Alert, ScrollView } from 'react-native';

import Button from '/component/Button';
import Link from '/component/Link';

import styles from '../UIKit.styles';

const style = {
  marginBottom: 16,
};

export default () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={styles.contentContainer}
    style={styles.scrollView}
  >
    <Button
      type="primary"
      onPress={() => Alert.alert('I was pressed')}
      text="Press Me"
      style={style}
    />
    <Button
      type="secondary"
      onPress={() => Alert.alert('I was pressed')}
      text="Press Me"
      style={style}
    />
    <Button
      type="ghost"
      onPress={() => Alert.alert('I was pressed')}
      text="Press Me"
      style={style}
    />
    <Button
      type="danger"
      onPress={() => Alert.alert('I was pressed')}
      text="Press Me"
      style={style}
    />
    <Button
      size="small"
      onPress={() => Alert.alert('I was pressed')}
      text="Press Me"
      style={style}
    />
    <Button
      size="large"
      onPress={() => Alert.alert('I was pressed')}
      text="Press Me"
      style={style}
    />
    <Button onPress={() => Alert.alert('I was pressed')} text="Press Me" style={style} />

    <Link text="This is a <Link />" onPress={() => Alert.alert('on press')} />
    <Link text="Link with an icon" onPress={() => Alert.alert('on press')} icon="doctor" />
  </ScrollView>
);
