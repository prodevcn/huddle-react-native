import { InteractionManager } from 'react-native';

import { TEXT_POSITIONS, ANCHORS } from './constants';

import { store } from '/state/store';

import NavigationService from '/navigation/NavigationService';
import screens from '/screen';
import { actions } from '/state/tutorial';
import { selectors as itemsSelectors } from '/state/items';

const getFirstItemId = () => itemsSelectors.itemListSelector(store.getState())[0];

const steps = [
  {
    text: 'Share any individual item by using the share button',
    icon: 'share',
    maskPadding: 54,
    onNext: () => {
      NavigationService.navigate(screens.ShareLink, {
        itemId: getFirstItemId(),
      });
    },
  },
  {
    text: 'Customize security settings',
    icon: 'lock',
    onNext: () => {
      // We want the new animation to start after a slight delay, so we are
      // using this timeout
      setTimeout(() => {
        store.dispatch(actions.setMask(store.getState().tutorial.anchors[ANCHORS.ShareLinkButton]));
      }, 250);
    },
  },
  {
    text: 'Share the secure link with anybody you choose',
    icon: 'link',
    textPosition: TEXT_POSITIONS.top,
    maskPadding: -64,
    onPress: () => {
      if (store.getState().tutorial.dismiss) {
        store.getState().tutorial.dismiss();
      }
      store.dispatch(actions.dismiss());
    },
  },
];

export default (navigation) => {
  const item = getFirstItemId();
  navigation.push(screens.ItemStack, {
    // todo toadums we should insert a mock item into the redux store instead of
    // relying on the first item
    itemId: item,
    registerTutorialDismiss: (dismiss) => {
      store.dispatch(actions.registerDismiss(dismiss));
    },
  });

  InteractionManager.runAfterInteractions(() => {
    store.dispatch(actions.start(steps));
  });
};
