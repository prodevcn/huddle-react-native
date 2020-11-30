module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '': './src',
          storybook: './storybook',
          assets: './assets',
        },
      },
    ],
  ],
};
