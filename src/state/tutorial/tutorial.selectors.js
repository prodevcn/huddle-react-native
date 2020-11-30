import { createSelector } from 'reselect';

export const activeSelector = (state) => state.tutorial.active;
export const maskCenterSelector = (state) => state.tutorial.mask.center;
export const maskRadiusSelector = (state) => state.tutorial.mask.radius;
export const stepsSelector = (state) => state.tutorial.steps;
export const currentStepsSelector = (state) => state.tutorial.currentStep;
export const unreadSelector = (state) => state.tutorial.unread;

export const maskSelector = createSelector(
  activeSelector,
  maskCenterSelector,
  maskRadiusSelector,
  stepsSelector,
  currentStepsSelector,
  (active, center, radius, steps, currentStep) => ({
    active,
    center,
    radius,
    steps,
    currentStep,
  }),
);
