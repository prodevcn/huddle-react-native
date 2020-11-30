import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: globalStyles.padding.xs,
    backgroundColor: globalStyles.color.withOpacity('deepBlue', 0.6),
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: globalStyles.padding.sm,
    flex: 1,
  },
  documentWrapper: {
    top: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: globalStyles.color.withOpacity('deepBlue', 0.8),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  documentText: {
    marginTop: globalStyles.padding.xs,
    textAlign: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
});
