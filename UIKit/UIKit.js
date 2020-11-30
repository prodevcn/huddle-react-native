import React from 'react';
import { ScrollView } from 'react-native';

import Button from '/component/Button';
import Text from '/component/Text';
import HeaderButton from '/navigation/header/HeaderButton';

import styles from './UIKit.styles';

const UIKit = ({ navigation }) => (
  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <Text.H1 style={styles.header}>Components</Text.H1>
    <Button
      text="Buttons"
      onPress={() => {
        navigation.push('UIKitButtons');
      }}
      size="small"
      style={styles.button}
    />

    <Button
      text="Typography"
      onPress={() => {
        navigation.push('UIKitTypography');
      }}
      size="small"
      style={styles.button}
    />

    <Button
      text="Form components"
      onPress={() => {
        navigation.push('UIKitFormComponents');
      }}
      size="small"
      style={styles.button}
    />

    <Button
      text="Icons"
      onPress={() => {
        navigation.push('UIKitIcons');
      }}
      size="small"
      style={styles.button}
    />

    <Button
      text="List Items"
      onPress={() => {
        navigation.push('UIKitListItems');
      }}
      size="small"
      style={styles.button}
    />

    <Button
      text="Badges"
      onPress={() => {
        navigation.push('UIKitBadges');
      }}
      size="small"
      style={styles.button}
    />

    <Button
      text="Alerts"
      onPress={() => {
        navigation.push('UIKitAlerts');
      }}
      size="small"
      style={styles.button}
    />

    <Button
      text="Modal windows"
      onPress={() => navigation.push('UIKitModalWindows')}
      size="small"
      style={styles.button}
    />

    <Button
      text="Avatars"
      onPress={() => navigation.push('UIKitAvatars')}
      size="small"
      style={styles.button}
    />

    <Text.H1 style={styles.header}>Navigation</Text.H1>

    <Button
      text="Screen with 1 button and label"
      onPress={() => {
        navigation.push('UIKitWithButtonLabel');
      }}
      style={styles.button}
      size="small"
    />

    <Button
      text="Screen with headerRight and background color"
      onPress={() => {
        navigation.push('UIKitWithButtonLabelAndBackground');
      }}
      style={styles.button}
      size="small"
    />
  </ScrollView>
);

UIKit.navigationOptions = ({ navigation }) => ({
  title: 'UI Kit',
  headerLeft: <HeaderButton icon="chevron-left" onPress={() => navigation.pop()} />,
});

export default UIKit;
