import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '/component/Text';
import { store } from '/state/store';

import { actions } from '/state/tutorial';
import globalStyles from '/styles';
import { ANCHORS } from '/tutorial/constants';

// Put the styles here since this isn't really a component anyway
const styles = StyleSheet.create({
  textWrapper: {
    paddingBottom: 50,
  },
  text: {
    textAlign: 'center',
    maxWidth: 250,
  },
  title: {
    marginBottom: globalStyles.padding.md,
  },
});

const steps = [
  {
    text: (
      <View
        style={styles.textWrapper}
        testID="welcome-tutorial"
      >
        <Text.H4 color="white" style={[styles.text, styles.title]}>
          You&apos;re in!
        </Text.H4>
        <Text.H4 color="white" style={styles.text}>
          Use these cards to get started with Huddle.
        </Text.H4>
      </View>
    ),
    onPress: () => {
      if (store.getState().tutorial.dismiss) {
        store.getState().tutorial.dismiss();
      }
      store.dispatch(actions.dismiss());
    },
  },
];

export default () => {
  store.dispatch(actions.start(steps));
  store.dispatch(actions.setMask(store.getState().tutorial.anchors[ANCHORS.WELCOME_CARD]));
};
