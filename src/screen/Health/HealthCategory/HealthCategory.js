import React from 'react';
import { useDispatch } from 'react-redux';

import globalStyles from '/styles';
import screens from '/screen';
import HealthItems from '/partial/HealthItems';
import * as events from '/constants/events/HealthSummary/homeScreen';
import { trackEvent } from '/state/mixpanel/mixpanel.actions';
import { itemTypes } from '/screen/Item/PickType';
import { clickHandler } from '/util/offlineMode';

export const pages = {
  [itemTypes.insurance]: {
    heading: 'Insurance',
    addText: 'Add insurance',
    iconName: 'Insurance',
    healthScreen: 'InsuranceItems',
    screenName: 'Insurance Info',
    addScreen: screens.AddInsuranceCard,
  },
  [itemTypes.medication]: {
    heading: 'Active Medication',
    addText: 'Add a new medication',
    iconName: 'Medication',
    healthScreen: 'ActiveMedication',
    screenName: 'View Medication',
    initialValues: { status: 'active' },
    additionalFilter: (item) => item.custom.status === 'active',
  },
  [itemTypes.allergy]: {
    heading: 'Allergies',
    addText: 'Add allergy',
    iconName: 'Allergy',
    healthScreen: 'InsuranceAllergy',
    screenName: 'View Allergies',
  },
  [itemTypes.vaccination]: {
    heading: 'Vaccinations and Immunizations',
    addText: 'Add vaccination or immunization',
    iconName: 'Vaccination',
    healthScreen: 'InsuranceVaccination',
    screenName: 'View Vaccination',
  },
  [itemTypes.condition]: {
    heading: 'Conditions',
    addText: 'Add condition',
    iconName: 'Condition',
    healthScreen: 'InsuranceCondition',
    screenName: 'View Condition',
  },
};

const HealthCategory = ({ navigation }) => {
  const dispatch = useDispatch();
  const type = navigation.getParam('type');

  const page = pages[type];

  const handleAdd = () => {
    dispatch(trackEvent(events.CLICK_ADD(type)));
    const screen = page.addScreen || screens.AddItem;

    navigation.push(screen, {
      initialType: type,
      hideTypeField: true,
      initialValues: page.initialValues,
      shouldPop: true,
    });
  };

  return (
    <HealthItems
      heading={page.heading}
      addText={page.addText}
      iconName={page.iconName}
      initialType={type}
      healthScreen={page.healthScreen}
      additionalFilter={page.additionalFilter}
      screenName={page.screenName}
      navigation={navigation}
      onAddPress={clickHandler(handleAdd)}
    />
  );
};

HealthCategory.navigationOptions = ({ navigationOptions }) => ({
  headerStyle: {
    ...navigationOptions.headerStyle,
    backgroundColor: globalStyles.palette.grey04,
  },
});

export default HealthCategory;
