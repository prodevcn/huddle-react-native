import { StyleSheet } from 'react-native';

import globalStyles from '/styles';

export const pickerStyles = StyleSheet.create({
  placeholder: {
    fontSize: 20,
    color: globalStyles.palette.grey01,
  },
  viewContainer: {
    fontSize: 20,
  },
  iconContainer: {
    paddingTop: 28,
  },
  inputIOS: {
    fontSize: 20,
    lineHeight: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.palette.grey03,
    color: globalStyles.palette.deepBlue,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 20,
    lineHeight: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.palette.grey03,
    color: globalStyles.palette.deepBlue,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  content: {
    paddingTop: globalStyles.padding.xxs,
    paddingHorizontal: globalStyles.padding.md,
  },
  subtitle: {
    paddingVertical: globalStyles.padding.sm,
  },
  issue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-around',
    alignItems: 'center',
    paddingVertical: globalStyles.padding.xxs,
  },
  issueFirstBlock: {
    flexDirection: 'row',
  },
  issueText: {
    marginLeft: 16,
  },
  input: {
    marginTop: globalStyles.padding.md,
  },
});

export default styles;
