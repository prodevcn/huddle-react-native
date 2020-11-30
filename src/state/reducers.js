import { combineReducers } from 'redux';
import { LOGOUT } from '/state/auth/auth.types';

import alerts from './alerts';
import auth from './auth';
import biometricAuthSettings from './biometricAuthSettings';
import careTeam from './careTeam';
import folders from './folders';
import helpDesk from './helpDesk';
import images from './images';
import items from './items';
import mixpanel from './mixpanel';
import offlineMode from './offlineMode';
import onboarding from './onboarding';
import overlays from './overlays';
import profiles from './profiles';
import share from './share';
import surveys from './surveys';
import tutorial from './tutorial';
import uploads from './uploads';

const appReducer = combineReducers({
  alerts,
  auth,
  biometricAuthSettings,
  careTeam,
  images,
  items,
  folders,
  helpDesk,
  mixpanel,
  offlineMode,
  onboarding,
  overlays,
  profiles,
  share,
  surveys,
  tutorial,
  uploads,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
