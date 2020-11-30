import React, { useState, useRef } from 'react';
import { View } from 'react-native';

import ViewPager from '@react-native-community/viewpager';
import CameraRoll from './CameraRoll';
import TakePicture from './TakePicture';

import HeaderButton from '/navigation/header/HeaderButton';

import globalStyles from '/styles';

import { NavigationInteractions } from '/util/interactionManager';

import styles from './Camera.styles';

// We need to wrap our actual pages in views, otherwise the ViewPager will
// re-render the pages on Android when we toggle their visibility. This
// caused the ViewPager to changes pages unexpectedly.
// We can't render Views directly in the ViewPager, we need to use a component,
// otherwise the ViewPager won't render anything (don't ask me why)
const Page = ({ children }) => (
  <View style={styles.page}>{children}</View>
);

const Camera = ({ navigation }) => {
  const scrollRef = useRef(null);
  const onSelect = navigation.getParam('onSelect');
  const showCameraRoll = navigation.getParam('showCameraRoll');
  const initialPage = showCameraRoll ? 0 : 1;

  // We want to keep track of which pages the user has visited so that we can
  // mount the page **only once the user visits it**. That way the user won't
  // be asked for permission to use their camera roll if they only use their camera
  const initialVisiblePages = [initialPage === 0, initialPage === 1];
  const [visiblePages, setVisiblePages] = useState(initialVisiblePages);

  const gotoPage = (page) => () => {
    scrollRef.current.setPage(page);
  };

  // After a page is scrolled to we will mark it as visible
  const handlePageSelected = (e) => {
    const page = e.nativeEvent.position;

    if (!visiblePages[page]) {
      const newPages = [...visiblePages];
      newPages[page] = true;

      setVisiblePages(newPages);
    }
  };

  const dismiss = () => {
    navigation.dismiss();
  };

  const handleSelect = (item) => {
    dismiss();
    onSelect(item);
  };

  const cameraroll = visiblePages[0] ? (
    <CameraRoll
      onSelect={handleSelect}
      switchPage={gotoPage(1)}
      dismiss={dismiss}
    />
  ) : <View />;

  const camera = visiblePages[1] ? (
    <TakePicture
      onSelect={handleSelect}
      switchPage={gotoPage(0)}
      dismiss={dismiss}
    />
  ) : <View />;

  return (
    <View style={styles.wrapper}>
      <NavigationInteractions />
      <ViewPager
        ref={scrollRef}
        initialPage={initialPage}
        onPageSelected={handlePageSelected}
      >
        <Page>{cameraroll}</Page>
        <Page>{camera}</Page>
      </ViewPager>
      <View style={styles.header} pointerEvents="box-none">
        <HeaderButton
          style={styles.closeButton}
          onPress={() => navigation.dismiss()}
          color={globalStyles.palette.white}
          icon="cross"
        />
      </View>
    </View>
  );
};

export default Camera;
