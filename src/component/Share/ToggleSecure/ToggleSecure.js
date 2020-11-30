import React, { useRef } from 'react';
import { InteractionManager, View } from 'react-native';

import Icon from '/component/Icon';
import Switch from '/component/Switch';
import Text from '/component/Text';

import styles from './ToggleSecure.styles';

const ToggleSecure = ({
  measure, selected, onToggle, style = {},
}) => {
  const viewRef = useRef(null);

  return (
    <View
      ref={viewRef}
      style={[styles.wrapper, style.wrapper]}
      onLayout={() => {
        if (measure) {
          InteractionManager.runAfterInteractions(() => {
            viewRef.current.measure(measure);
          });
        }
      }}
    >
      <Icon name="lock" size={24} />
      <Text style={styles.label}>
        Require patient&apos;s last name and date of birth to access?
      </Text>
      <Switch
        onChange={(value) => onToggle(!!value)}
        style={styles.switch}
        value={selected}
      />
    </View>
  );
};

export default ToggleSecure;
