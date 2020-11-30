import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  // There is no reason to use a custom image component here -
  // we are just rendering an image as-is
  Image,
} from 'react-native';

import Text from '/component/Text';

import styles from './ReviewInsurance.styles';
import useDeterminer from '/hook/useDeterminer';

const ReviewInsurance = ({ docs, navigation }) => {
  const determiner = useDeterminer();

  return (
    <ScrollView
      style={styles.header}
    >
      {!!docs.length && (
        <Image
          key={docs[0]}
          source={{ uri: docs[0].uri }}
          style={styles.card}
        />
      )}
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.retake}>
        <Text>Retake image</Text>
      </TouchableOpacity>
      <Text.H2 style={styles.heading}>
        {`Review ${determiner} insurance information`}
      </Text.H2>
    </ScrollView>
  );
};

export default ReviewInsurance;
