import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  fieldWithValue: {
    height: 'auto',
  },
  textWithValue: {
    // A normal Field's element poitioning is driven by the
    // height of the field. We are letting our field be an
    // arbitrary height, so need to introduce some magic
    // numbers to make sure elements are in the right spot
    marginTop: 16,
  },
});
