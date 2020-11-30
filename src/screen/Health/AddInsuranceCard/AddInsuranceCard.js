import React, { useEffect } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import api from '/api';
import globalStyles from '/styles';
import Alert from '/overlay/Alert';
import screens from '/screen';
import Icon from '/component/Icon';
import Text from '/component/Text';
import { itemTypes } from '/screen/Item/PickType';
import HeaderButton from '/navigation/header/HeaderButton';
import useDeterminer from '/hook/useDeterminer';
import { selectors } from '/state/profiles';
import * as events from '/constants/events/HealthSummary/addInsuranceCard';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import styles from './AddInsuranceCard.styles';

const AddInsuranceCard = ({ navigation }) => {
  const readOnlyActiveProfile = useSelector(selectors.readOnlyActiveProfileSelector);

  useEffect(() => {
    if (readOnlyActiveProfile) {
      Alert.error(api.userMessages.upload.readOnlyActiveProfile);
      navigation.pop();
    }
  }, [readOnlyActiveProfile]);

  const determiner = useDeterminer();
  const dispatch = useDispatch();

  const insuranceType = {
    hideTypeField: true,
    initialType: itemTypes.insurance,
    navigation,
  };

  const onScanInsurancePress = () => {
    dispatch(trackEvent(events.CLICK_SCAN_INSURANCE_CARD));
    navigation.push(screens.ScanInsuranceCard);
  };

  const onManualInsurancePress = () => {
    dispatch(trackEvent(events.CLICK_ENTER_MANUALLY));
    navigation.push(screens.AddItem, insuranceType);
  };

  return (
    <ScrollView>
      <Text.H1 style={{ marginHorizontal: 24 }}>
        Add
        {' '}
        {determiner}
        {' '}
        insurance card below
      </Text.H1>
      <Text style={styles.paragraph}>
        Adding
        {' '}
        {determiner}
        {' '}
        insurance card will allow you to
        access it from anywhere and share it securely
      </Text>
      <TouchableOpacity onPress={onScanInsurancePress} style={styles.iconGroup}>
        <Icon color={globalStyles.palette.teal} name="camera" size={40} style={styles.icon} />
        <Text.H4 weight="regular">Scan insurance card</Text.H4>
      </TouchableOpacity>
      <TouchableOpacity style={styles.manualGroup} onPress={onManualInsurancePress}>
        <Text.BodySmall>Enter insurance details manually</Text.BodySmall>
      </TouchableOpacity>
    </ScrollView>
  );
};

AddInsuranceCard.navigationOptions = ({ navigation }) => {
  const firstStackScreen = navigation.getParam('firstStackScreen');

  if (firstStackScreen) {
    return {
      headerLeft: () => <HeaderButton icon="back" onPress={() => navigation.pop()} />,
    };
  }

  return {};
};

export default AddInsuranceCard;
