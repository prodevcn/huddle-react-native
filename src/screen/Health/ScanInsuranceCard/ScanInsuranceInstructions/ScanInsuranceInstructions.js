import React from 'react';

import useDeterminer from '/hook/useDeterminer';
import Text from '/component/Text';

import styles from './ScanInsuranceInstructions.styles';

const ScanInsurancePermissions = () => {
  const determiner = useDeterminer();

  return (
    <>
      <Text.H1 style={styles.h1}>
        Scan
        {' '}
        {determiner}
        {' '}
        card
      </Text.H1>
      <Text style={styles.bullet1}>1. Move photo to fit card to box.</Text>
      <Text style={styles.bullet2}>
        2. When the card is positioned, tap &quot;Take Photo&quot;
      </Text>
    </>
  );
};

export default ScanInsurancePermissions;
