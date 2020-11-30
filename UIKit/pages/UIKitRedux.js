import * as React from 'react';

import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import Button from '/component/Button';

import { actions } from '/state/onboarding';

import baseStyles from '../UIKit.styles';

const UIKitRedux = ({ flow, changeFlow }) => {
  const onPress = () => {
    changeFlow(flow === 'login' ? 'signup' : 'login');
  };

  return (
    <ScrollView
      contentContainerStyle={baseStyles.contentContainer}
      style={baseStyles.scrollView}
    >
      <Button text={`Current flow: ${flow}`} onPress={onPress} />
    </ScrollView>
  );
};


export default connect((state) => ({
  flow: state.onboarding.flow,
}), { changeFlow: actions.changeFlow })(UIKitRedux);
