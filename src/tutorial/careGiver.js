import { TEXT_POSITIONS, ANCHORS } from './constants';
import { store } from '/state/store';

import NavigationService from '/navigation/NavigationService';
import screens from '/screen';
import { actions } from '/state/tutorial';

const steps = [
  {
    text: 'Select the avatar to view all profiles you have access to',
    icon: 'user',
    maskPadding: 36,
    onNext: () => {
      NavigationService.navigate(screens.ProfilesStack, {
        registerTutorialDismiss: (dismiss) => {
          store.dispatch(actions.registerDismiss(dismiss));
        },
      });
    },
  },
  {
    text: 'Select manage on the profile you’d like to share',
    icon: 'settings',
    maskPadding: 36,
    onNext: () => {
      setTimeout(() => {
        NavigationService.navigate(screens.ManageProfileStack);
      }, 250);
    },
  },
  {
    text: 'Invite the people you\'d like to have full access to the profile',
    icon: 'link',
    textPosition: TEXT_POSITIONS.top,
    maskPadding: 64,
    maskOffset: { y: -48, x: 24 },
    onPress: () => {
      if (store.getState().tutorial.dismiss) {
        store.getState().tutorial.dismiss();
      }
      store.dispatch(actions.dismiss());
    },
  },
];

export default () => {
  store.dispatch(actions.start(steps));

  setTimeout(() => {
    store.dispatch(actions.setMask(store.getState().tutorial.anchors[ANCHORS.ProfileButton]));
  }, 250);
};
