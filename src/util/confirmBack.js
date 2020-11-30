import { form } from '/api/userMessages';
import isFunction from 'lodash/isFunction';
import { CONFIRM_BACK } from '/constants/config';

import { store } from '/state/store';
import { actions as overlayActions } from '/state/overlays';
import ConfirmDialog from '/overlay/ConfirmDialog';

/**
 * Prompt the user to confirm when they try to navigate away from a form.
 * This function doesn't need to be used directly in your components,
 * you should use `confirmBack`
 *
 * @param {function} onConfirm
 */
const confirmFormNavigation = (onConfirm) => {
  store.dispatch(overlayActions.show(ConfirmDialog, {
    title: form.confirmNavigation.title,
    description: form.confirmNavigation.description,
    confirmButtonTitle: 'Leave',
    onPress: onConfirm,
  }));
};


/**
 * If the CONFIRM_BACK parameter is in your navivation params, prompt
 * the user before popping the current screen.
 *
 * Note: if `navigationAction` is not defined, this function will
 * default to `navigation.pop()`
 *
 * @param {object} navigation
 * @param {function} [navigationAction]
 */
export default (navigation, navigationAction) => () => {
  const action = isFunction(navigationAction)
    ? navigationAction
    : navigation.pop;

  if (navigation.getParam(CONFIRM_BACK)) {
    confirmFormNavigation(action);
  } else {
    action();
  }
};
