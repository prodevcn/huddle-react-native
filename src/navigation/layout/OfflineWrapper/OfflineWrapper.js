import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Animated } from 'react-native';

import Text from '/component/Text';

import { selectors } from '/state/offlineMode';
import useAnimation from '/hook/useAnimation';

import styles, { HEIGHT } from './OfflineWrapper.styles';

const OfflineWrapper = ({ children }) => {
  const isOffline = useSelector(selectors.isOffline);
  const { animation, toStart, toEnd } = useAnimation({ defaultToEnd: isOffline });

  // When the offline state changes show/hide the banner
  useEffect(() => {
    if (isOffline) {
      toEnd();
    } else {
      toStart();
    }
  }, [isOffline]);

  const style = [
    styles.banner,
    {
      transform: [{
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-HEIGHT, 0],
        }),
      }],
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={[styles.content, isOffline && styles.offlineContent]}>
        {children}
      </View>
      <Animated.View style={style}>
        <Text size={10} weight="medium" color="white" lineHeight={14}>
          You are currently offline
        </Text>
      </Animated.View>
    </View>
  );
};

export default OfflineWrapper;
