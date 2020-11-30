import screens from '/screen';
import { store } from '/state/store';
import { actions as onboardingActions } from '/state/onboarding';

const dismiss = (navigation) => {
  store.dispatch(onboardingActions.setDismissed());
  navigation.navigate(screens.HomeStack);
};

export default {
  dismiss,
};
