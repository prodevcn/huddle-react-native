import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import globalStyles from '/styles';

const containerStyle = StyleSheet.create({
  container: {
    padding: globalStyles.padding.lg,
  },
});

const Container = ({ children }) => (
  <ScrollView
    contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
    contentInsetAdjustmentBehavior="automatic"
    style={containerStyle.container}
  >
    {children}
  </ScrollView>
);

export default Container;
