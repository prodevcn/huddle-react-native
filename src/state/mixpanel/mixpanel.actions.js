import mixpanel from '/util/mixpanelService';
import * as types from './mixpanel.types';
import redactor from '/util/redactor';
import errorLogger from '/util/errorLogger';

export const trackError = (event, error = null) => (dispatch, getState) => {
  const { screenName } = getState().mixpanel;

  let errorMessage = error && error.message;
  if (!error) {
    errorMessage = 'Caught so no error';
  }

  errorMessage = redactor(errorMessage, { source: 'external' }).sanitize();

  const errorProperties = {
    event: `Error: ${event}`,
    props: {
      error: errorMessage,
      screenName,
    },
  };

  dispatch({
    type: types.ERROR,
    meta: {
      mixpanel: errorProperties,
    },
  });
};

export const trackEvent = (event) => (dispatch, getState) => {
  const { screenName } = getState().mixpanel;

  dispatch({
    type: types.TRACK,
    meta: {
      mixpanel: {
        event,
        props: {
          screenName,
        },
      },
    },
  });
};

export const setScreenName = (screenName) => (dispatch) =>
  dispatch({ type: types.SET_SCREEN_NAME, screenName });

export const setGroup = (groupName, groupValue) => (dispatch) => {
  mixpanel.setGroup(groupName, groupValue);

  dispatch({
    type: types.SET_GROUP,
    groupName,
    groupValue,
  });
};

export const setUserPropOnce = (properties) => (dispatch) => {
  mixpanel.setOnce(properties); // does not overwrite existing Mixpanel people properties

  dispatch({ type: types.SET_USER_PROPERTY, properties });
};

export const createAlias = (identifier, profileCode) => (dispatch) => {
  mixpanel.createAlias(identifier);
  mixpanel.setOnce({ Created: new Date().toISOString(), profileCode });
  mixpanel.showInAppMessageIfAvailable();

  dispatch({ type: types.CREATE_ALIAS });
};

export const identifyUser = (identifier) => (dispatch) => {
  mixpanel.identify(identifier);
  mixpanel.showInAppMessageIfAvailable();
  errorLogger.identify(identifier);

  dispatch({ type: types.IDENTIFY });
};
