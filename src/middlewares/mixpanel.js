import { isEmpty, get } from 'lodash';

const mixpanelMiddleware = (mixpanel) => {
  if (!mixpanel || !mixpanel.track) {
    throw new TypeError('You must provide a mixpanel client instance.');
  }

  // eslint-disable-next-line no-unused-vars
  return (store) => (next) => (action) => {
    if (!get(action, 'meta.mixpanel.event')) {
      return next(action);
    }

    try {
      const { event, props } = action.meta.mixpanel;

      if (!isEmpty(props)) {
        mixpanel.trackWithProperties(event, props);
      } else {
        mixpanel.track(event);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}

    return next(action);
  };
};

export default mixpanelMiddleware;
