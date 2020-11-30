/* eslint-disable react/sort-comp */
/**
 * This generic form makes it easy to render a simple form of fields, such as
 * TextInputs, DateInputs, PhoneInputs, and full text areas.
 *
 * If you are creating a form which is complicated, such as the Medication form,
 * you should probably render it as a custom component instead of using this one.
 */
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { withNavigation } from 'react-navigation';

import TextArea from '/overlay/ModalTextArea';
import TextInput from '/component/TextInput';
import MultilineValueField from '/component/MultilineValueField';

import formStyles from '/partial/ItemForm/subform/form.styles';
import { actions as overlayActions } from '/state/overlays';

class GenericForm extends React.PureComponent {
  // If you would like to render a custom, reusable, component without passing
  // in the Component attribute in fields, you can create a type here and handle
  // it in the render function
  static TYPES = {
    BIG_TEXT: 'BIG_TEXT',
  };

  // Array of refs, so that we can programmatically go to the next input
  fieldRefs = [];

  // Open the TextArea for a BIG_TEXT field
  openTextArea = (key, placeholder) => () => {
    const { formProps, showOverlay } = this.props;
    const { handleChange, values } = formProps;

    showOverlay(TextArea, {
      onSubmit: ({ value }) => handleChange(key)(value),
      value: values[key],
      placeholder,
    });
  }

  renderBigText = ({ key, label, placeholder }) => {
    const { formProps } = this.props;
    const value = formProps.values[key];

    return (
      <MultilineValueField
        key={key}
        style={formStyles.field}
        value={value}
        label={label}
        onPress={this.openTextArea(key, placeholder)}
        animateBlur
      />
    );
  }

  render() {
    const { formProps, fields = [] } = this.props;
    const {
      values,
      handleChange,
      isValid,
      handleSubmit,
      errors,
    } = formProps;

    // Loop over all the fields in the config and render the correct field
    const children = fields.map((field, i) => {
      // You can add any custom, reusable components here
      if (field.type === GenericForm.TYPES.BIG_TEXT) {
        return this.renderBigText(field);
      }

      // Default to a TextInput
      const Component = field.Component || TextInput;

      const isFinalField = i === fields.length - 1;
      const nextRef = this.fieldRefs[i + 1];
      const hasNextRef = nextRef && nextRef.focus;


      // Handle the `return` key on the keyboard
      const handleSubmitEditing = () => {
        // If we aren't the final field and we have a next ref which
        // is focusable, we want to focus it when the user returns
        if (!isFinalField) {
          if (hasNextRef) {
            nextRef.focus();
          }
        } else if (isValid && !this.disabled) {
          this.disabled = true;
          setTimeout(() => {
            if (this.unmounted) return;
            this.disabled = false;
          }, 350);
          handleSubmit();
        }
      };

      const setRef = (ref) => {
        if (ref) {
          this.fieldRefs[i] = ref;
        }
      };

      let returnKeyType;
      if (isFinalField) {
        returnKeyType = 'done';
      } else if (hasNextRef) {
        returnKeyType = 'next';
      }

      return (
        <Component
          key={field.key}
          style={formStyles.field}
          value={values[field.key]}
          label={field.label}
          onChangeText={handleChange(field.key)}
          blurOnSubmit={false}
          errorMessage={errors[field.key]}
          onSubmitEditing={handleSubmitEditing}
          returnKeyType={returnKeyType}
          getInputRef={setRef}
        />
      );
    });

    return (
      <>
        {children}
      </>
    );
  }
}

const fieldType = propTypes.shape({
  key: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  Component: propTypes.elementType,
});

GenericForm.propTypes = {
  fields: propTypes.arrayOf(fieldType).isRequired,
};

const connectedComponent = connect(null, {
  showOverlay: overlayActions.show,
})(GenericForm);

export default withNavigation(connectedComponent);
