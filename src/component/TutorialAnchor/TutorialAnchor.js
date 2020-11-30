import React, { useRef } from 'react';
import { InteractionManager, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { actions } from '/state/tutorial';

const TutorialAnchor = ({
  onLayout, name, children, style,
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleLayout = () => {
    InteractionManager.runAfterInteractions(() => {
      if (!(ref && ref.current)) return;

      ref.current.measure((x, y, width, height, pageX, pageY) => {
        const anchor = {
          layout: {
            x: pageX,
            y: pageY,
            width,
            height,
          },
        };

        // If we provide a name, we will add this anchor to redux. You will
        // want to provide a name if you have multiple anchors on the same
        // screen (ie. multiple steps on the same screen) or if your anchor
        // is already visible before the tutorial starts. Providing the
        // name is like queuing up the anchor for a later step :)
        if (name) {
          dispatch(actions.registerAnchor(name, anchor));
        } else {
          // if we do not provide a name, immediately update the anchor
          // You want to do this for the first (and possibly only) anchor
          // on a given screen - it will show after the component mounts and animates
          dispatch(actions.setMask(anchor));
        }

        if (onLayout) {
          onLayout();
        }
      });
    });
  };

  return (
    <View ref={ref} onLayout={handleLayout} style={style}>
      {children}
    </View>
  );
};

export default TutorialAnchor;
