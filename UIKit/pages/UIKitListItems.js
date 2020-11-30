import * as React from 'react';
import { Alert, ScrollView } from 'react-native';

import ListItem from '/component/ListItem';
import Button from '/component/Button';

import styles from '../UIKit.styles';

export default () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={styles.conentContainer}
    style={styles.scrollView}
  >
    <ListItem icon="Other" label="Plain" />
    <ListItem icon="Other" label="Plain with notification" hasNotification />
    <ListItem icon="Other" label="Plain with square icon" squarePreview />
    <ListItem
      icon="Other"
      label="Plain with square icon"
      squarePreview
      hasNotification
      bold
      description="Plus bold and a description"
    />
    <ListItem
      icon="Other"
      label="Plain with square icon and a couple of lines of overflow"
      squarePreview
      description="Plus bold and a description, even the description is longer!"
    />
    <ListItem icon="Location" label="With a description" description="this is the description" />
    <ListItem icon="Medication" label="With a button">
      <Button size="small" type="ghost" text="Add" onPress={() => Alert.alert('Button press')} />
    </ListItem>
    <ListItem icon="Medication" label="With selection" selected />
    <ListItem icon="Medication" label="With selection" selected={false} />
  </ScrollView>
);
