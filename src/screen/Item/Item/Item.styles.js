import { Dimensions, StyleSheet } from 'react-native';

import globalStyles from '/styles';

const { width } = Dimensions.get('window');

// Because the image component reads the styles to calculate the width/heigth
// we cannot pass in an array of styles like we normally can. So instead of
// duplicating the base image styles, we can use this object
const imageStyle = {
  alignSelf: 'center',
  height: 280,
  borderRadius: 8,
  maxWidth: width - globalStyles.padding.md * 2,
  overflow: 'hidden',
};

const styles = StyleSheet.create({
  content: {
    paddingTop: globalStyles.padding.xs,
    paddingBottom: globalStyles.bottomSpacing,
  },
  header: {
    backgroundColor: globalStyles.palette.grey04,
    paddingBottom: 32,
  },
  title: {
    paddingHorizontal: globalStyles.padding.md,
    marginBottom: 12,
  },
  subtitle: {
    paddingHorizontal: globalStyles.padding.md,
  },
  image: {
    ...imageStyle,
  },
  // If we have multiple images, make the maxWidth a bit smallet to guarantee
  // we get a preview that there are more items in the scrollview
  multiImage: {
    ...imageStyle,
    maxWidth: width - globalStyles.padding.md * 3,
  },
  imageWrapper: {
    marginLeft: globalStyles.padding.md,
  },
  imageScroller: {
    paddingRight: globalStyles.padding.md,
    alignItems: 'flex-end',
    paddingTop: 32,
  },
  fields: {
    paddingHorizontal: globalStyles.padding.md,
  },
  field: {
    marginTop: globalStyles.padding.sm,
  },
  fieldLabel: {
    marginBottom: globalStyles.padding.xs,
  },
  note: {
    paddingTop: 32,
  },
  noteBorder: {
    borderTopWidth: 1,
    borderTopColor: globalStyles.palette.grey03,
    marginTop: 40,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default styles;
