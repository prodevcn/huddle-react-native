import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

const styles = StyleSheet.create({
  content: {
    paddingTop: globalStyles.padding.xxs,
    alignItems: 'flex-start',
    paddingHorizontal: globalStyles.padding.md,
    paddingBottom: globalStyles.bottomSpacing,
  },
  title: {
    marginBottom: globalStyles.padding.xl,
  },
  sectionItem: {
    marginTop: globalStyles.padding.md,
  },
  paragraph: {
    marginTop: globalStyles.padding.xxs,
  },
  listItems: {
    paddingLeft: globalStyles.padding.sm,
    paddingRight: globalStyles.padding.md,
  },
});

export default styles;
