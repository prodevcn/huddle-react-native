/* eslint-disable react/no-array-index-key */
import React from 'react';
import { ScrollView, View } from 'react-native';

import Text from '/component/Text';
import BulletedListItem from '/component/BulletedListItem';
import styles from './styles';

const DATA = [
  'async-storage (https://github.com/react-native-community/async-storage)',
  'react-native-blur (https://github.com/react-native-community/react-native-blur)',
  'react-native-image-editor (https://github.com/react-native-community/react-native-image-editor)',
  'date-fns (https://github.com/date-fns/date-fns)',
  'formik (https://github.com/jaredpalmer/formik)',
  'hex-rgba (https://github.com/alesanabria/hex-rgba)',
  'lodash (https://github.com/lodash/lodash/)',
  'react (https://github.com/facebook/react/)',
  'react-native (https://github.com/facebook/react-native)',
  'react-native-camera (https://github.com/react-native-community/react-native-camera)',
  'react-native-cameraroll (https://github.com/react-native-community/react-native-cameraroll)',
  'react-native-config (https://github.com/luggit/react-native-config)',
  'react-native-contacts (https://github.com/rt2zz/react-native-contacts)',
  'react-native-file-viewer (https://github.com/vinzscam/react-native-file-viewer)',
  'react-native-gesture-handler (https://github.com/software-mansion/react-native-gesture-handler)',
  'react-native-image-crop-picker (https://github.com/ivpusic/react-native-image-crop-picker)',
  'react-native-image-resizer (https://github.com/bamlab/react-native-image-resizer)',
  'react-native-iphone-x-helper (https://github.com/ptelad/react-native-iphone-x-helper)',
  'react-native-keyboard-manager (https://github.com/douglasjunior/react-native-keyboard-manager)',
  'react-native-keyboard-spacer (https://github.com/Andr3wHur5t/react-native-keyboard-spacer)',
  'react-native-survey-monkey (https://github.com/yarikpwnzer/react-native-survey-monkey)',
  'react-native-svg (https://github.com/react-native-community/react-native-svg)',
  'react-native-svg-transformer (https://github.com/kristerkari/react-native-svg-transformer)',
  'react-native-touch-id (https://github.com/naoufal/react-native-touch-id)',
  'react-native-vector-icons (https://github.com/oblador/react-native-vector-icons)',
  'react-native-view-pager (https://github.com/react-native-community/react-native-viewpager)',
  'react-navigation (https://github.com/react-navigation/react-navigation)',
  'react-navigation-stack (https://github.com/react-navigation/stack)',
  'react-navigation-tabs (https://github.com/react-navigation/tabs)',
  'react-redux (https://github.com/reduxjs/react-redux)',
  'redux (https://github.com/reduxjs/redux)',
  'redux-persist (https://github.com/rt2zz/redux-persist)',
  'reselect (https://github.com/reduxjs/reselect)',
  'rn-fetch-blob (https://github.com/joltup/rn-fetch-blob)',
  'yup (https://github.com/jquense/yup)',
].sort();

const Acknowledgements = () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={styles.content}
  >
    <Text.H1 style={styles.title}>Acknowledgements</Text.H1>

    <Text color="medium" style={styles.paragraph}>
      Copyright © 2004-2013 by Internet Systems Consortium, Inc. (“ISC”){'\n'}
      Copyright © 1995-2003 by Internet Software Consortium
    </Text>

    <Text color="medium" style={styles.paragraph}>
      THE SOFTWARE IS PROVIDED “AS IS” AND ISC DISCLAIMS ALL WARRANTIES WITH REGARD TO
      THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT
      SHALL ISC BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
      DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF
      CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION
      WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
    </Text>

    <View style={[styles.listItems, styles.paragraph]}>
      {DATA.map((item, idx) => (
        <BulletedListItem key={idx}>
          <Text
            color="medium"
            style={{ flex: 1 }}
          >
            {item}
          </Text>
        </BulletedListItem>
      ))}
    </View>
  </ScrollView>
);

export default Acknowledgements;
