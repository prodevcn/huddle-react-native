import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { selectors } from '/state/profiles';
import DetailedIcon from '/component/DetailedIcon';
import Icon from '/component/Icon';

import Text from '/component/Text';

import styles from './NoteField.styles';

const NoteField = ({ note, onPress, style }) => {
  const readOnlyActiveProfile = useSelector(selectors.readOnlyActiveProfileSelector);

  const LargeIcon = note ? DetailedIcon.NoteCustom : DetailedIcon.NoteCreate;
  const smallIcon = note ? 'eye' : 'plus';
  const subtitle = note ? 'Edit Note' : 'Add Note';

  const handlePress = () => {
    if (!readOnlyActiveProfile) {
      onPress();
    }
  };

  const Wrapper = readOnlyActiveProfile ? View : TouchableOpacity;

  return (
    <View style={[styles.wrapper, style]}>
      <Wrapper
        onPress={handlePress}
        style={styles.noteButton}
      >
        <LargeIcon />
        <Text.H3 style={styles.noteTitle}>
          Notes
        </Text.H3>

        {!readOnlyActiveProfile && (
          <>
            <Icon
              name={smallIcon}
              size={16}
            />
            <Text.Label style={styles.noteSubtitle}>
              {subtitle}
            </Text.Label>
          </>
        )}
      </Wrapper>
      {!!note && <Text style={styles.preview}>{note}</Text>}
    </View>
  );
};

export default NoteField;
