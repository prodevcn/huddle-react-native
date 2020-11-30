import { createSelector } from 'reselect';
import biometricTypes from '/constants/biometricTypes';

export const biometricSupportSelector = (state) => state.biometricAuthSettings.biometricSupport;
export const biometryTypeSelector = (state) => state.biometricAuthSettings.biometryType;
export const isLoadingSelector = (state) => state.biometricAuthSettings.isLoading;
export const biometricAuthEnabledSelector = (state) =>
  state.biometricAuthSettings.biometricAuthEnabled;

export const biometricsHasBeenSetSelector = (state) =>
  state.biometricAuthSettings.biometricsHasBeenSet;

export const biometricAuthSettingsSelector = createSelector(
  biometricSupportSelector,
  biometryTypeSelector,
  biometricAuthEnabledSelector,
  isLoadingSelector,
  (biometricSupport, biometryType, biometricAuthEnabled, isLoading) => ({
    biometricSupport,
    biometryType: biometricTypes[biometryType],
    biometricAuthEnabled,
    isLoading,
  }),
);
