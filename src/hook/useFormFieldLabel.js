import { useState } from 'react';

import { REQUIRED_LABEL } from '/constants/config';

function useFormFieldLabel({
  onChangeText,
  isValid,
  value,
}) {
  const [allowError, setErrorAllowable] = useState(false);

  /**
   * Allow custom validation rules before showing error labels
   * @param newValue
   */
  const handleTextChange = (newValue) => {
    // This allows additional checks specific for the field component text changing.
    // For example DateInput is using the isValid so 00 is prevented since it's not
    // a valid date as 00 is not a month.
    if (isValid && !isValid(newValue)) return;

    if (newValue !== value) {
      setErrorAllowable(true);
      if (onChangeText) {
        onChangeText(newValue);
      }
    }
  };

  /**
   * Only "Required" error labels are shown on mount any other
   * error labels should be hidden until form field focus
   * @param errorMessage
   * @returns {string}
   */
  const allowErrorMessage = (errorMessage) => {
    if (errorMessage !== REQUIRED_LABEL && !allowError) return '';
    return errorMessage;
  };

  return { allowErrorMessage, handleTextChange };
}

export default useFormFieldLabel;
