// Example copy, pasted, modified from
// https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html

import { StackActions, NavigationActions } from 'react-navigation';

import screens from '/screen';

let navigator;
// This will hold an initial route that we want to show once
// the navigator is set
let navigateOnInit;

/**
 * Navigate to `routeName` passing in `params`
 *
 * @param {string} routeName
 * @param {object} params
 */
const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

/**
 * Reset the navigation stack to the initial state.
 *
 * This is useful when you logout to navigate away from the settings screen
 */
const resetStack = () => {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: screens.InitialStack }),
      ],
    }),
  );

  navigator.dispatch(NavigationActions.navigate({ routeName: screens.OnboardingStack }));
};

/**
 * Navigate immediate if `navigator` is defined, otherwise
 * queue up the `routeName` and `params` and navigate once
 * `navigator` is set
 *
 * @param {string} routeName
 * @param {object} params
 */
const navigateOrQueue = (routeName, params) => {
  if (navigator) {
    navigate(routeName, params);
  } else {
    navigateOnInit = { routeName, params };
  }
};

/**
 * This function should be called once we get a navigator in our
 * appContainer so that our navigation service has access to it
 *
 * @param {navigator} navigatorRef
 */
const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;

  if (navigateOnInit) {
    navigate(navigateOnInit.routeName, navigateOnInit.params);
    navigateOnInit = null;
  }
};

export default {
  navigate,
  setTopLevelNavigator,
  navigateOrQueue,
  resetStack,
};
