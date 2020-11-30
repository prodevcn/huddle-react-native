import RNFS from 'react-native-fs';
import NetInfo from '@react-native-community/netinfo';
import values from 'lodash/values';

import { store } from '/state/store';
import { actions } from '/state/offlineMode';

import fsConstants from '/constants/fs';

import showOfflineAlert from './showOfflineAlert';

class OfflineMode {
  isOffline = false;

  // Convenience attaching this to the class so we don't need to import
  // multiple things when we want to check offline status
  showOfflineAlert = showOfflineAlert;

  initialize = () => {
    // Subscribe to connection change events. This will also be called
    // initially when we create the listener as well
    this.removeNetworkListener = NetInfo.addEventListener((state) => {
      this.type = state.type;
      this.isOffline = !state.isConnected;

      store.dispatch(actions.setIsOffline(!state.isConnected));
    });

    return this.initializeDirectories();
  }

  // This unsubscribe method isn't currently being called, but is here incase you
  // ever find a need for it
  unsubscribe = () => {
    if (this.removeNetworkListener) {
      this.removeNetworkListener();
    }
  }

  // Make sure all the directories exist where we will store documents/thumbnails
  initializeDirectories = async () => {
    const promises = values(fsConstants.directories).map(async (dir) => {
      try {
        await RNFS.readDir(dir);
      } catch (e) {
        await RNFS.mkdir(dir);
      }
    });

    return Promise.all(promises);
  }
}

export default new OfflineMode();
