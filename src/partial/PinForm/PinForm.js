import React from 'react';
import { ScrollView } from 'react-native';

import Text from '/component/Text';
import PinInput from '/component/PinInput';
import Link from '/component/Link';

import styles from './PinForm.styles';

const PinForm = ({
  title,
  subtitle,
  onSubmit,
  ctaText,
  ctaPress,
  blurOnSubmit,
  testID,
}) => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={styles.content}
    style={styles.scrollView}
    keyboardShouldPersistTaps="handled"
    testID={testID}
  >
    <Text.H2>{title}</Text.H2>

    <Text color="medium" style={styles.subtitle}>
      {subtitle}
    </Text>

    <PinInput
      style={styles.inputs}
      handleSubmit={onSubmit}
      blurOnSubmit={blurOnSubmit}
    />

    {!!(ctaText && ctaPress) && <Link onPress={ctaPress} text={ctaText} style={styles.cta} />}
  </ScrollView>
);

export default PinForm;
