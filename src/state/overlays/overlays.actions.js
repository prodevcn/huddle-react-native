import * as types from './overlays.types';
import { overlayAnimationDuration } from '/constants/config';

export const dismiss = () => async (dispatch) => {
  dispatch({
    type: types.DISMISSING,
  });

  // Wait 250ms so that the initial overlay has enough time to animate off screen
  await new Promise((resolve) => {
    setTimeout(resolve, overlayAnimationDuration);
  });

  dispatch({
    type: types.DISMISS,
  });
};

export const show = (overlay, data) => async (dispatch, getState) => {
  const currentOverlay = getState().overlays.overlays[0];

  // If we have a current overlay we want to do a transition.
  if (currentOverlay) {
    // Start the transition. This way the OverlayContainer can elegantly
    // transition between the two overlays
    dispatch({
      type: types.TRANSITION,
      payload: true,
    });

    // Wait 250ms so that the initial overlay has enough time to animate off screen
    await new Promise((resolve) => {
      setTimeout(resolve, overlayAnimationDuration);
    });

    // Add the new overlay to the overlays array
    dispatch({
      type: types.SHOW,
      payload: {
        Component: overlay,
        data,
      },
    });

    // Wait for the new overlay to animate into the screen then mark the transition
    // as finished.
    setTimeout(() => {
      dispatch({
        type: types.TRANSITION,
        payload: false,
      });
    }, overlayAnimationDuration);

    // Remove the initial overlay from the overlays array. Note: we do
    // not want to call the dismiss handler here because we don't want ht
    // dismissing state to be set
    dispatch({
      type: types.DISMISS,
    });
  } else {
    // If this is the first overlay, just show it - nice and easy :)
    dispatch({
      type: types.SHOW,
      payload: {
        Component: overlay,
        data,
      },
    });
  }
};
