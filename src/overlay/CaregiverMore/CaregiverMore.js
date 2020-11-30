import React from 'react';
import { useDispatch } from 'react-redux';

import globalStyles from '/styles';
import BottomSheet, { BottomSheetRow } from '/component/BottomSheet';
import ConfirmDialog from '/overlay/ConfirmDialog';
import { actions } from '/state/overlays';

const CaregiverMore = ({ animation, removeParams }) => {
  const dispatch = useDispatch();

  const handleRemovePress = () => {
    dispatch(actions.show(ConfirmDialog, { ...removeParams }));
  };

  return (
    <BottomSheet animation={animation}>
      <BottomSheetRow
        onPress={handleRemovePress}
        icon="delete"
        label="Remove as a Caregiver"
        iconColor={globalStyles.palette.orange}
      />
    </BottomSheet>
  );
};

export default CaregiverMore;
