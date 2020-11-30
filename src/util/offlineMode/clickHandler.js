import offlineMode from './offlineMode';
import showOfflineAlert from './showOfflineAlert';

// This helper can wrap a button action to check and make sure the
// user is online before firing the actual handler
const clickHandler = (handler) => (...args) => {
  if (offlineMode.isOffline) {
    showOfflineAlert();
  } else {
    handler(...args);
  }
};

export default clickHandler;
