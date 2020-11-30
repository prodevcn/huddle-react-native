import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

import pkg from '../../package.json';

function init() {
  if (Config.LINEUP === 'DEV') return;

  Sentry.init({
    environment: Config.LINEUP,
    dsn: 'https://e5444e650f214272bdade96ce2ec9747@sentry.io/2326780',
  });
  Sentry.setRelease(`com.drfirst.huddle-${pkg.version}`);
  Sentry.setDist(__DEV__ ? 'debug' : 'release');
}

const server = (exception) => {
  if (Config.LINEUP === 'DEV') return;

  Sentry.captureException(exception);
};
const identify = (id) => Sentry.setUser({ id });

export default {
  identify,
  init,
  server,
};
