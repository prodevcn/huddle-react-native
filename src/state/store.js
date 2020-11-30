import { createStore, applyMiddleware, compose } from 'redux';
import { getStoredState, persistStore, persistReducer } from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import keys from 'lodash/keys';
import get from 'lodash/get';

import NavigationService from '/navigation/NavigationService';
import MixpanelMiddleware from '/middlewares/mixpanel';
import currentProfileMiddleware from '/middlewares/currentProfile';
import Reactotron from '../../ReactotronConfig';
import mixpanel from '/util/mixpanelService';
import rootReducer from './reducers';
import serverAgent from '/api/serverAgent';

import { actions as onboardingActions } from '/state/onboarding';
import { actions as profileActions } from '/state/profiles';

import screens from '/screen';

const persistConfig = {
  timeout: 0,
  key: 'root',
  storage: AsyncStorage,
  // Only these reducers will be persisted
  whitelist: ['biometricAuthSettings', 'auth', 'uploads', 'images', 'items', 'folders', 'profiles'],
  migrate: (state) => {
    // Make sure we don't blow up if we don't have upload state
    const uploads = get(state, 'uploads.uploads') || {};
    const items = get(state, 'uploads.items') || {};

    const newItems = {};
    const newUploads = {};

    // When redux-persist re-hydrates the store, remove any uploads
    // that have successfully uploaded - ie. any uploads that have
    // a `docUniqueName` associated with them.
    keys(items).forEach((itemId) => {
      const uploadIds = [];
      items[itemId].forEach((uploadId) => {
        const upload = uploads[uploadId];
        // If the upload doesn't have a docUniqueName that means that the
        // upload failed and we should keep that upload in the redux store
        if (!get(upload, 'docUniqueName')) {
          uploadIds.push(uploadId);
          newUploads[uploadId] = {
            ...upload,
            failed: true,
          };
        }
      });

      if (uploadIds.length) {
        newItems[itemId] = uploadIds;
      }
    });

    const newState = {
      ...state,
      uploads: {
        items: newItems,
        uploads: newUploads,
      },
    };
    return Promise.resolve(newState);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const mixpanelMiddleware = new MixpanelMiddleware(mixpanel);

const middlewares = [thunk, mixpanelMiddleware, currentProfileMiddleware];

// eslint-disable-next-line import/no-mutable-exports
let store;

if (__DEV__) {
  store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(...middlewares),
      Reactotron.createEnhancer(),
    ),
  );
} else {
  store = createStore(persistedReducer, applyMiddleware(...middlewares));
}

const persistor = persistStore(store);

// When the app loads we can load initial that is persisted in
// redux state into the API service layer
getStoredState(persistConfig).then(async (state) => {
  if (state && state.auth) {
    if (state.auth.accessToken) {
      serverAgent.setAccessToken(state.auth.accessToken);
    }

    if (state.auth.profileCode) {
      store.dispatch(profileActions.setActiveProfile(state.auth.profileCode));
    }
  }

  // Super sketchy dev check that will prevent us from needing to
  // log in every time we refresh the app.
  if (__DEV__) {
    try {
      await store.dispatch(onboardingActions.devLogin());
      await store.dispatch(onboardingActions.setDismissed());
      NavigationService.navigate(screens.HomeStack);
      SplashScreen.hide();

      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
});

export { store, persistor };
