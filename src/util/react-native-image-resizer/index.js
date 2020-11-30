// This library does not have a default `index.js` export, it only has
// index.ios and index.android. This makes  our app think that the
// package does not exist. We provide this index.js file to appease eslint
export default () => null;
