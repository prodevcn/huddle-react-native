// This middleware will get the active profile code out of the state
// and attach it to the action meta so all reducers can access it
export default ({ getState }) => (next) => (action) => {
  const meta = action.meta || {};

  if (!meta.activeProfileCode) {
    meta.activeProfileCode = getState().profiles.activeProfileCode;
  }

  return next({
    ...action,
    meta,
  });
};
