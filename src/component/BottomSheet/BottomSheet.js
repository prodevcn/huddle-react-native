import React, { useState } from 'react';
import { Animated, Dimensions, View } from 'react-native';

import globalStyles from '/styles';
import styles from './BottomSheet.styles';

const { height } = Dimensions.get('window');

const BottomSheet = ({ children, animation, testID }) => {
  const [contentHeight, setContentHeight] = useState(height);

  // Get the height of the white background so we can precisely animate it's Y pos
  const handleBoxLayout = (e) => {
    setContentHeight(e.nativeEvent.layout.height);
  };

  const sheetHeight = contentHeight + globalStyles.bottomSpacing;

  const boxStyle = [
    styles.box,
    {
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [sheetHeight, 0],
          }),
        },
      ],
    },
    // Modal appears from bottom to height of content
    { marginTop: height - sheetHeight },
  ];

  return (
    <Animated.View style={boxStyle}>
      <View
        onLayout={handleBoxLayout}
        testID={testID}
      >
        {children}
      </View>
    </Animated.View>
  );
};

export default BottomSheet;
