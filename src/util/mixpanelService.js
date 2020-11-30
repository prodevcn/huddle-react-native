import { MixpanelInstance } from 'react-native-mixpanel';
import Config from 'react-native-config';

class MixpanelService {
  constructor() {
    this.mixpanel = new MixpanelInstance(Config.MIXPANEL_KEY);

    this.mixpanel.initialize() // eslint-disable-next-line no-console
      .catch((error) => console && console.error('Failed to initialize Mixpanel:', error));
  }

  track = (event) => {
    this.mixpanel.track(event);
  }

  trackWithProperties = (event, properties) => {
    this.mixpanel.track(event, properties);
  }

  identify = async (userId) => {
    try {
      await this.mixpanel.identify(userId);
      // eslint-disable-next-line no-empty
    } catch {}
  }

  reset = async () => {
    try {
      await this.mixpanel.reset();
      // eslint-disable-next-line no-empty
    } catch {}
  }

  showInAppMessageIfAvailable = async () => {
    try {
      await this.mixpanel.showInAppMessageIfAvailable();
      // eslint-disable-next-line no-empty
    } catch {}
  }

  createAlias = async (alias) => {
    try {
      await this.mixpanel.alias(alias);
      // eslint-disable-next-line no-empty
    } catch {}
  }

  setGroup = async (name, value) => {
    try {
      await this.mixpanel.setGroup(name, value);
      // eslint-disable-next-line no-empty
    } catch {}
  }

  setOnce = async (properties) => {
    try {
      await this.mixpanel.setOnce(properties);
      // eslint-disable-next-line no-empty
    } catch {}
  }
}

export default new MixpanelService();
