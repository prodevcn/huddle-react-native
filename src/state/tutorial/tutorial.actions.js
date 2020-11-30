import AsyncStorage from '@react-native-community/async-storage';
import values from 'lodash/values';

import * as types from './tutorial.types';
import { TUTORIALS, STATES } from '/tutorial/constants';

import { actions as alertActions } from '/state/alerts';
import api from '/api';

const getAsyncKey = (tutorial) => `tutorial-${tutorial}`;

// Do we want to center the mask around an element (layout)? Or
// are our center and radius provided?
const getMaskState = ({ center, layout, radius }) => {
  let c = center;
  let r = radius;

  // If you provide a layout we will center the cutout around that element
  if (layout) {
    c = {
      x: layout.x + layout.width / 2,
      y: layout.y + layout.height / 2,
    };
  }

  // If we don't provide a radius but provide a layout it will make
  // the radius the size of the bigger dimension of the target layout,
  // with 24 padding all around
  if (!radius && layout) {
    r = (Math.max(layout.height, layout.width)) / 2;
  }

  const payload = {};
  if (c) payload.center = c;
  if (r) payload.radius = r;

  return payload;
};

// Start a tutorial, pass in an array of steps
export const start = (steps) => (dispatch) => {
  dispatch({
    type: types.START,
    steps,
  });
};

// Increment to the next step
export const next = () => ({
  type: types.NEXT,
});

// Set the mask props, this can also be used to update them if we are
// moving the mask
export const setMask = (props) => ({
  type: types.SET_MASK,
  payload: getMaskState(props),
});

// Stop the tutorial
export const dismiss = () => ({
  type: types.DISMISS,
});

// Register an anchor that we can use in the future during a tutorial.
// Note: if you want to immediately show an anchor, you will want to
// use setMask()
export const registerAnchor = (name, anchor) => ({
  type: types.REGISTER_ANCHOR,
  name,
  anchor: getMaskState(anchor),
});

// We will be pushing screens while stepping through a tutorial,
// and we won't necessarily know which navigator to dismiss at
// the end, so just register **how** to dismiss the tutorial
// once the tutorial starts.
// Note: this is a very manual, random process that I cannot
// figure out a better way to handle
export const registerDismiss = (dismissAction) => ({
  type: types.REGISTER_DISMISS,
  dismiss: dismissAction,
});

// Get a list of all unread tutorials. We do this by getting all the
// tutorial state out of async storage. Any tutorial whose state in
// async storage is in the STATES hash should be set to "read"
export const getUnread = () => async (dispatch) => {
  try {
    const states = values(STATES);
    const tutorials = values(TUTORIALS);
    const payload = {};

    const tutorialStates = await Promise.all(tutorials.map(async (tutorial) => {
      const state = await AsyncStorage.getItem(getAsyncKey(tutorial));
      return [tutorial, !states.includes(state)];
    }));

    tutorialStates.forEach(([tutorial, state]) => {
      payload[tutorial] = state;
    });

    dispatch({
      type: types.GET_UNREAD,
      payload,
    });
  } catch (e) {
    dispatch(alertActions.show({
      ...api.userMessages.generic,
      type: 'warning',
    }));
  }
};

// Update the tutorial state in async storage and then mark it as
// read in the payload
export const changeUnread = (name, state) => async (dispatch) => {
  try {
    const states = values(STATES);
    await AsyncStorage.setItem(getAsyncKey(name), state);

    dispatch({
      type: types.CHANGE_UNREAD,
      payload: {
        name,
        unread: !states.includes(state),
      },
    });
  } catch (e) {
    dispatch(alertActions.show({
      ...api.userMessages.generic,
      type: 'warning',
    }));
  }
};

// Reset all tutorials to be unread. This involves removing all tutorial
// state from async storage.
export const resetUnread = () => async (dispatch) => {
  try {
    const tutorials = values(TUTORIALS);

    await Promise.all(tutorials.map(async (tutorial) => {
      await AsyncStorage.removeItem(getAsyncKey(tutorial));
    }));

    dispatch({
      type: types.RESET_UNREAD,
      // When looking for the state of a tutorial, we look to see if it
      // has been completed or dismissed, so returning an empty object
      // is the same as explicitly setting all tutorials' unread to true
      payload: {},
    });
  } catch (e) {
    dispatch(alertActions.show({
      ...api.userMessages.generic,
      type: 'warning',
    }));
  }
};
