/* eslint-disable import/prefer-default-export */

/**
 * This component will register an interaction handle (think of it like a mutex)
 * so that our components can wait until **after** a navigation animation
 * finishes to do something. For example:
 *
 * ```
 * # Show the item screen
 * navigation.push(screens.Item, opts)
 *
 * # Show the tutorial after the item modal animation finishes
 * InteractionManager.runAfterInteractions(() => {
 *   startItemTutorial()
 * })
 * ```
 */

import React, { useRef } from 'react';
import { InteractionManager } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export const NavigationInteractions = () => {
  const interactionRef = useRef(null);
  const handleWillFocus = () => {
    interactionRef.current = InteractionManager.createInteractionHandle();
  };

  const handleDidFocus = () => {
    InteractionManager.clearInteractionHandle(interactionRef.current);
  };

  return (
    <NavigationEvents
      onWillFocus={handleWillFocus}
      onDidFocus={handleDidFocus}
    />
  );
};
