import * as React from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import screens from '/screen';
import Text from '/component/Text';
import ListItem from '/component/ListItem';
import Button from '/component/Button';
import HeaderButton from '/navigation/header/HeaderButton';
import showBiometrics from '/navigation/helpers/showBiometrics';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import * as events from '/constants/events/Onboarding/takeCareOfAnyoneElse';
import { actions, selectors } from '/state/onboarding';

import styles from './Caregiver.styles';

const Caregiver = ({ navigation }) => {
  const dispatch = useDispatch();
  const onboardingFlow = navigation.getParam('onboardingFlow');
  const suggestionData = useSelector(selectors.suggestionDataSelector);
  const registeringAsCaregiver = useSelector(selectors.registeringAsCaregiverSelector);

  const handleAction = (dependentType) => async () => {
    switch (dependentType) {
      case 'partner':
        dispatch(trackEvent(events.CLICK_SPOUSE_PARTNER));
        break;

      case 'parent':
        dispatch(trackEvent(events.CLICK_PARENT));
        break;

      case 'child':
        dispatch(trackEvent(events.CLICK_CHILD));
        break;

      case 'other':
        dispatch(trackEvent(events.CLICK_SOMEONE_ELSE));
        break;

      default:
        return;
    }

    if (onboardingFlow) {
      if (registeringAsCaregiver && !isEmpty(suggestionData)) {
        try {
          // If we are registering as a caregiver we will be able to automatically
          // create our new profile with the suggestion data
          await dispatch(actions.registerProfile(suggestionData, dependentType));
          showBiometrics(navigation, true);

          return;
        } catch (e) {
          // if there is an error, take the user to the form to manually enter info
          // we don't need to explicitly do this navigation, it will happen down below
        }
      }

      navigation.push(screens.OnboardingEnterInfo, {
        dependentType,
        onboardingFlow,
        showBack: true,
      });
    } else {
      navigation.push(screens.NewProfilePersonalDetails, {
        dependentType,
        showBack: true,
      });
    }
  };

  const handleSoloProfilePress = () => {
    dispatch(trackEvent(events.CLICK_JUST_ME));
    showBiometrics(navigation, true);
  };

  let title = 'What is your relationship to this person?';

  if (onboardingFlow) {
    title = 'Can we help you take care of anyone else?';
  }

  if (!isEmpty(suggestionData)) {
    title = `What is your relationship to ${suggestionData.firstName}?`;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      testID="onboarding-caregiver-form"
    >
      <Text.H2 style={[styles.padded, styles.title]}>{title}</Text.H2>

      <ListItem
        icon="RelationshipCouple"
        label="Spouse/Partner"
        onPress={handleAction('partner')}
      />
      <ListItem icon="RelationshipParent" label="Parent" onPress={handleAction('parent')} />
      <ListItem icon="RelationshipChild" label="Child" onPress={handleAction('child')} />
      <ListItem icon="RelationshipOther" label="Someone else" onPress={handleAction('other')} />

      {!!onboardingFlow && isEmpty(suggestionData) && (
        <Button
          text="No thanks, just me"
          onPress={handleSoloProfilePress}
          style={[styles.padded, styles.button]}
          type="ghost"
          testID="caregiver-just-me"
        />
      )}

      <Text.BodySmall style={styles.note} color="medium">
        By continuing you certify that you are the parent, legal guardian, or personal
        representative of this patient and have all authority required by state and federal law to
        access this information.
      </Text.BodySmall>
    </ScrollView>
  );
};

Caregiver.navigationOptions = ({ navigation }) => {
  const onboardingFlow = navigation.getParam('onboardingFlow');

  return ({
    headerLeft: onboardingFlow ? null : <HeaderButton icon="back" onPress={() => navigation.pop()} />,
  });
};

export default Caregiver;
