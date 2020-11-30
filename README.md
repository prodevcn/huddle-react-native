Huddle
======

Huddle is a medical document organizing and sharing mobile application built using React Native.

## Dependencies

I am certainly missing some because I did not set this project up from a clean install (nor did I take comprehensive notes) but here are key software requirements:

I believe all team members are using MacOs computers.

### Homebrew

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

### Node.js

The React Native docs recommend using homebrew, but I do not. Use a Node version manger like [nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n). This will allow you to not lose your ability to develop on legacy apps, and should make the project easier to update to current Node.js versions in the future.

I suggest we use Node.js version 12

Instead of npm the team prefers yarn. Install with homebrew or if you'd rather, `npm i -g yarn` worked for me.

### React Native 

A good place to start is here: https://facebook.github.io/react-native/docs/getting-started.html but please install Node using a version manager.

I am on these versions:

    react-native-cli: 2.0.1
    react-native: 0.60.6

### Cocoapods

    sudo gem install cocoapods

## Build

1. Clone this repository
1. run `yarn install`
1. Install iOS dependencies `yarn pod:install`
1. Run `react-native run-ios` or `yarn android:run`

## Release

#### Android

1. Ensure .env.production have secrets
1. [Build](#Build)
1. Smoke test in Android phone (or Simulator)
1. Bump version _/package.json_ and _/android/app/build.gradle_ (Android versioning)
1. `yarn android:release` PROD build and Sentry sourcemap 
1. Locate generated APK in _huddle/app/build/outputs/apk/app-release.apk_

#### iOS

1. Xcode GUI like normal
1. `yarn ios:release` Sentry sourcemap

## Debug

You can use [reactotron](https://github.com/infinitered/reactotron) for debug network requests 
and `console.log` also will log to reactotron and browser console. 
You need to:
1. Install reactotron [desktop app](https://github.com/infinitered/reactotron/blob/master/docs/installing.md).
2. Run reactotron desktop app.
2. Run app in emulator in dev environment.

Check [docs](https://github.com/infinitered/reactotron/tree/master/docs) for more details.

## End to End Testing

### Setup

1. [Install Dependencies](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md#step-1-install-dependencies)

### Execute
1. (Tab 1) Run `yarn start-detox`
1. (Tab 2) Run `yarn detox:build && yarn detox`

## Standards

The Huddle team will be using the airbnb React/JSX style guide https://github.com/airbnb/javascript/tree/master/react and the airbnb JavaScript style guide https://github.com/airbnb/javascript. 

## Resources

https://metalab.invisionapp.com/share/HVSM5QGR5NA
