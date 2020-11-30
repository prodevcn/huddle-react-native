// eslint-disable-next-line import/no-extraneous-dependencies
import { getStorybookUI, configure } from '@storybook/react-native';
import { AsyncStorage } from '@react-native-community/async-storage';
import './rn-addons';
// eslint-disable-next-line import/no-unresolved,import/extensions
import { loadStories } from './storyLoader';

configure(() => {
  loadStories();
}, module);

const StorybookUI = getStorybookUI({
  asyncStorage: AsyncStorage,
});

export default StorybookUI;
