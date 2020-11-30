import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import TextInput from '/component/TextInput';
import Text from '/component/Text';
import Switch from '/component/Switch';
import DateInput from '/component/DateInput';
import SearchInput from '/component/SearchInput';
import Checkbox from '/component/Checkbox';

import styles from '../UIKit.styles';

export default () => {
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [phone, setPhone] = useState('');
  const [keyword, setKeyword] = useState('');
  const [largeValue, setLargeValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState(false);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.contentContainer, { alignItems: 'stretch' }]}
      style={styles.scrollView}
    >
      <Text.H2>Checkboxes</Text.H2>
      <Checkbox checked={checkboxValue} onChange={setCheckboxValue} label="Checkbox" />

      <Checkbox checked disabled label="Disabled Checkbox Checked" />
      <Checkbox disabled style={{ marginBottom: 20 }} label="Disabled Checkbox" />

      <Text.H2>Radio List</Text.H2>
      <Checkbox
        checked={radioValue === 1}
        onChange={() => setRadioValue(1)}
        round
        label="Radio 1"
      />
      <Checkbox
        checked={radioValue === 2}
        onChange={() => setRadioValue(2)}
        round
        label="Radio 2"
      />
      <Checkbox
        checked={radioValue === 3}
        onChange={() => setRadioValue(3)}
        style={{ marginBottom: 20 }}
        round
        label="Radio 3"
      />

      <Text.H2 style={{ marginBottom: 16 }}>Inputs</Text.H2>
      <SearchInput value={keyword} onChangeText={setKeyword} />
      <DateInput
        label="Date of Birth"
        value={date}
        onChangeText={setDate}
        style={{ marginTop: 16 }}
      />

      <TextInput value={value} onChangeText={setValue} label="label" style={{ marginTop: 16 }} />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        label="Phone number"
        style={{ marginTop: 16 }}
        placeholder="(250)-888-1234"
      />

      <TextInput
        value="1234"
        label="Phone number"
        style={{ marginTop: 16 }}
        errorMessage="Invalid phone number"
      />

      <TextInput
        value={largeValue}
        onChangeText={setLargeValue}
        style={{ marginTop: 16, marginBottom: 32 }}
        placeholder="Large Input"
        size="large"
      />

      <Text.H2 style={{ marginBottom: 16 }}>Switches</Text.H2>
      <Switch value label="hello" />
      <Switch style={{ marginTop: 16 }} />
    </ScrollView>
  );
};
