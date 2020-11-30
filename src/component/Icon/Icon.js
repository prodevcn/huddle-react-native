/**
 * !!NB: Read this if you ever need to add/remove/change an icon
 *
 * ## Adding to icomoon
 *
 * If you'd like to add a new icon to the base Huddle icon set you
 * need to go to https://icomoon.io/app/#/projects and "Import Project."
 * Select `./icomoon.json`, and you will see the icon font. Then you can
 * add/remove to this set however you like. Just make sure the icon remains
 * square, and if you get the error about icomoon being able to handle
 * strokes, read their guide on how to fix that.
 *
 * After you made your changes download your set, rename `selection.json` to
 * `icomoon.json`, and put it in **this** directory. You also need to rename
 * `fonts/icomoon.ttf` to `Huddle.ttf`. Then do the following:
 *
 * Then replace the file in `ios/` **and** in `android/app/src/main/assets/fonts`.
 */
import * as React from 'react';
import { Animated } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import icoMoonConfig from './icomoon.json';

import globalStyles from '/styles';

import styles from './Icon.styles';

const HuddleIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'Huddle.ttf');

// I find it easier to **not** rename icons, otherwise if we get a new export
// from design, or if someone is working off the original Sketch file, we will
// just need to rename them all again. This hash lets us override any icon names we don't like
const iconRename = {
  'Edit----Pencil': 'edit',
  'Edit----Pencil--Line': 'edit-line',
  'Star----Filled': 'star',
  'Star----Outline': 'star-filled',
  'Folder----Empty': 'folder',
};

const iconNames = {};

// The icon names are pretty ugly (see examples in `iconRename`). So lets
// make them a bit more friendly for us to type
icoMoonConfig.icons.forEach(({ properties: { name } }) => {
  let simple = name;
  if (iconRename[name]) {
    simple = iconRename[name];
  }

  simple = simple.replace(/-+/g, '-').toLowerCase();
  iconNames[simple] = name;
});

const Icon = ({
  size = 24, color = globalStyles.palette.deepBlue, name, style: styleProp,
}) => {
  // We make this an animated component. We can pass in animations to the style prop
  // or pass an animation in as the color
  const AnimatedComponent = Animated.createAnimatedComponent(HuddleIcon);

  return (
    <AnimatedComponent
      size={size}
      name={iconNames[name]}
      style={[styles.icon, { color }, styleProp]}
    />
  );
};

Icon.iconNames = iconNames;

export default Icon;
