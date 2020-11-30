/* eslint-disable  max-classes-per-file */
import * as React from 'react';
import { Text as RNText } from 'react-native';

import styles from './Text.styles';
import globalStyles from '/styles';

class Text extends React.PureComponent {
  render() {
    const {
      color = 'dark',
      fontSize = 14,
      lineHeight = 22,
      weight = 'regular',
      style: styleProp,
      underline = false,
      allowFontScaling = false,
      ...rest
    } = this.props;

    const font = globalStyles.font.fontBuilder(color, weight, fontSize, lineHeight);
    const style = [styles.text, font, underline && styles.underline, styleProp];

    return (
      <RNText
        style={style}
        allowFontScaling={allowFontScaling}
        {...rest}
      />
    );
  }
}

Text.H1 = class extends React.PureComponent {
  render() {
    return <Text weight="medium" fontSize={36} lineHeight={44} {...this.props} />;
  }
};

Text.H2 = class extends React.PureComponent {
  render() {
    return <Text weight="medium" fontSize={30} lineHeight={40} {...this.props} />;
  }
};
Text.H3 = class extends React.PureComponent {
  render() {
    return <Text weight="medium" fontSize={24} lineHeight={32} {...this.props} />;
  }
};
Text.H4 = class extends React.PureComponent {
  render() {
    return <Text weight="medium" fontSize={18} lineHeight={24} {...this.props} />;
  }
};
Text.H5 = class extends React.PureComponent {
  render() {
    return <Text weight="medium" fontSize={16} lineHeight={20} {...this.props} />;
  }
};

Text.BodySmall = class extends React.PureComponent {
  render() {
    return <Text weight="regular" fontSize={14} lineHeight={20} {...this.props} />;
  }
};

Text.Row = class extends React.PureComponent {
  render() {
    return <Text weight="regular" fontSize={18} lineHeight={24} {...this.props} />;
  }
};

Text.Label = class extends React.PureComponent {
  render() {
    return <Text weight="Regular" fontSize={14} lineHeight={16} {...this.props} />;
  }
};

// There are times that we want to use raw text - for example to pass a <Text>
// component into one of our `Text.X` components without default props
// being applied
Text.Plain = RNText;

export default Text;
