import { createSelector } from 'reselect';

export const transitioningSelector = (state) => state.overlays.transitioning;
export const dismissingSelector = (state) => state.overlays.dismissing;
export const overlaysSelector = (state) => state.overlays.overlays;

export const activeOverlaySelector = createSelector(
  overlaysSelector,
  (overlays) => (overlays[0]),
);
