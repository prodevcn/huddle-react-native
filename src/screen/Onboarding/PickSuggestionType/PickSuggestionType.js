/**
 * This component will allow the user to pick if the current suggestion is for themselves,
 * or if they are signing up as a caretaker for the suggestion-person
 */
import React, { useState } from 'react';

import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Text from '/component/Text';
import ListItem from '/component/ListItem';
import showBiometrics from '/navigation/helpers/showBiometrics';

import styles from './PickSuggestionType.styles';
import { pluralizeName } from '/util';
import { actions, selectors } from '/state/onboarding';

import screens from '/screen';

const PickSuggestionType = ({ navigation }) => {
  const dispatch = useDispatch();
  const suggestionData = useSelector(selectors.suggestionDataSelector);
  const [loading, setLoading] = useState(false);

  const handleMePress = async () => {
    setLoading(true);
    try {
      // Store in redux that this is *my* profile data, so I can skip filling out the
      // EnterInfo form
      dispatch(actions.setRegisteringAsCaregiver(false));
      await dispatch(actions.register(suggestionData));
      showBiometrics(navigation, true);
    } catch (e) {
      // If there was an error take the user to the form to manually enter info
      navigation.push(screens.OnboardingEnterInfo);
    }
  };

  const handleCaregiverPress = () => {
    // Store in redux that the profile data should be added to a profile on my account,
    // and is *not* my information
    dispatch(actions.setRegisteringAsCaregiver(true));
    navigation.push(screens.OnboardingEnterInfo);
  };

  const name = suggestionData.firstName;

  return (
    <ScrollView style={styles.content}>
      <Text.H2 style={[styles.padded, styles.title]}>Next, let us know who you are</Text.H2>

      <ListItem
        icon="user"
        label={`I am ${name}`}
        onPress={handleMePress}
        loading={loading}
      />
      <ListItem
        icon="user-group"
        label={`I am ${pluralizeName(name)} caregiver`}
        onPress={handleCaregiverPress}
      />
    </ScrollView>
  );
};

PickSuggestionType.navigationOptions = {
  headerLeft: null,
};

export default PickSuggestionType;
