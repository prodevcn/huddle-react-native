/**
 * You can put this component inside your form and pass in the
 * `navigation` and `dirty` (from Formik) props.
 *
 * It will set a value in your navigation params that your back handlers
 * can check. If the value is set, you will cancel the back action
 */
import React, { useEffect } from 'react';
import { NavigationEvents } from 'react-navigation';

import { CONFIRM_BACK } from '/constants/config';

const FormBackButton = ({ navigation, dirty }) => {
  const enableBack = () => {
    navigation.setParams({ [CONFIRM_BACK]: false });
  };

  useEffect(() => {
    if (dirty) {
      navigation.setParams({ [CONFIRM_BACK]: true });
    } else {
      enableBack();
    }
  }, [dirty]);

  // Make sure we re-enable back when this component blurs
  return <NavigationEvents willBlur={enableBack} />;
};

export default FormBackButton;
