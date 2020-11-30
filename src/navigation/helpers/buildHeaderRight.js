import * as React from 'react';
import HeaderButton from '../header/HeaderButton';

import Text from '/component/Text';

/**
 * Header Right Config
 *
 * This is the config of each item in the headerRight config
 *
 * @typedef {Object} HeaderRightConfig
 *
 * @property {string} icon
 * This will map to the name of an icon in our icon font
 * @property {function} onPress
 * The function that is called when the button is pressed
 * @property {string} [label]
 * A text label that is rendered to the right of the icon if headerRight.length === 1
 * @property {string} [color] This stroke/text colour will be passed to child components
 */

/**
 * Create a button group for icons to be rendered on the right side of the header
 *
 * @param {[HeaderRightConfig]} headerRight
 * An array of {@link HeaderRightConfig} to render as buttons
 */
const buildHeaderRight = (headerRight = []) => {
  const firstChild = headerRight[0];

  // If we have exactly one headerRight element, and it has a label, render the
  // label to the right of the icon. Both elements can be clicked to trigger the action
  if (headerRight.length === 1 && firstChild.label && firstChild.icon) {
    const style = {
      flexDirection: 'row',
      alignItems: 'center',
    };

    return (
      <HeaderButton
        onPress={firstChild.onPress}
        icon={firstChild.icon}
        key={firstChild.icon}
        color={firstChild.color}
        style={style}
        measure={firstChild.measure}
      >
        <Text.H5 key="label" style={{ marginLeft: 12 }} color={firstChild.color}>
          {firstChild.label}
        </Text.H5>
      </HeaderButton>
    );
  }

  // If we have more than 1 element, render an array of buttons, 24px apart
  if (headerRight.length > 1) {
    const right = [];
    headerRight.forEach((config) => {
      if (config.component) {
        right.push(config.component);
      } else if (config.icon) {
        right.push(
          <HeaderButton {...config} key={config.icon} right />,
        );
      }
    });

    return right;
  }

  // Returning this allows us to override headerRight with anything we want -
  // not just the {icon, onPress, label} objects explained above
  return headerRight;
};

export default buildHeaderRight;
