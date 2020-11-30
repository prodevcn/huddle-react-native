import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import screens from '/screen';
import HeaderButton from '/navigation/header/HeaderButton';
import StorybookUI from './index';

StorybookUI.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <HeaderButton icon="back" onPress={() => navigation.dismiss()} />,
});

export default createStackNavigator({
  [screens.Storybook]: StorybookUI,
}, {
  initialRouteName: screens.Storybook,
});
