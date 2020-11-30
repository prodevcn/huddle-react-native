import React from 'react';

import {
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';

import BasicIcon from '/component/Icon';
import DetailedIcon from '/component/DetailedIcon';
import Text from '/component/Text';
import Checkbox from '/component/Checkbox';
import Badge from '/component/Badge';

import styles from './ListItem.styles';

import useTimeout from '/hook/useTimeout';

import globalStyles from '/styles';

const ListItem = ({
  icon,
  style,
  checkboxStyle,
  hideCheckbox,
  bold,
  label,
  labelEllipsizeMode,
  description,
  squarePreview,
  iconProps = {},
  hideUnderline,
  hasNotification,
  onPress,
  children,
  selected,
  onCheckChange,
  preview,
  actionSymbolName,
  actionSymbolColor,
  iconWrapperStyle,
  hidePreview,
  hideActionSymbol,
  loading,
}) => {
  let Preview = preview;
  let selection;

  const Wrapper = onPress ? TouchableOpacity : View;
  let actionSymbol = <BasicIcon name="chevron-right" color={actionSymbolColor} size={16} />;
  if (actionSymbolName === 'none') {
    actionSymbol = null;
  } else if (actionSymbolName) {
    actionSymbol = <BasicIcon name={actionSymbolName} color={actionSymbolColor} size={16} />;
  }

  let child = children || actionSymbol;

  // The chevron on the right of the screen will be replaced with a
  // spinner while the loading prop is true
  if (loading) {
    child = (
      <ActivityIndicator
        color={globalStyles.palette.grey01}
      />
    );
  }

  if (icon && !preview && !hidePreview) {
    if (DetailedIcon[icon]) {
      const Component = DetailedIcon[icon];
      Preview = <Component {...iconProps} />;
    } else {
      Preview = <BasicIcon name={icon} {...iconProps} />;
    }
  }

  const isSelect = typeof selected !== 'undefined';

  if (isSelect) {
    selection = (
      <Checkbox
        style={checkboxStyle}
        checked={selected}
        onChange={onCheckChange}
        hidden={hideCheckbox}
      />
    );
  }

  const pressTimeout = useTimeout(onPress);
  // Don't allow the item to be pressed again while loading
  const handlePress = loading ? () => null : pressTimeout;

  return (
    <View>
      <Wrapper style={[styles.listItem, style]} onPress={handlePress}>
        {selection}
        {!hidePreview && (
          <View
            style={[
              styles.iconWrapper,
              squarePreview && styles.iconWrapperSquare,
              iconWrapperStyle,
            ]}
          >
            {Preview}
          </View>
        )}

        {!!hasNotification && (
          <Badge.Notification style={styles.notification} />
        )}

        <View style={[
          styles.labelWrapper,
          !child && styles.labelWrapperNoAction,
        ]}
        >
          <Text.Row
            weight={bold ? 'medium' : 'regular'}
            style={styles.label}
            ellipsizeMode={labelEllipsizeMode}
            numberOfLines={1}
          >
            {label}
          </Text.Row>

          {!!description && (
            <Text.BodySmall
              color="medium"
              style={styles.description}
              numberOfLines={1}
            >
              {description}
            </Text.BodySmall>
          )}
        </View>
        {!hideActionSymbol && child}
      </Wrapper>
      {!hideUnderline && (
        <View
          style={[
            styles.underline,
            isSelect && styles.selectUnderline,
            !!hidePreview && styles.underlineNoPreview,
          ]}
        />
      )}
    </View>
  );
};

export default ListItem;
