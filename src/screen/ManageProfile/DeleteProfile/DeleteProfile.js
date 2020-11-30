import React from 'react';

import globalStyles from '/styles';
import Text from '/component/Text';

const DeleteProfile = ({ firstName }) => (
  <Text weight="regular" fontSize={18} lineHeight={24} color={globalStyles.palette.grey01}>
    All of
    {' '}
    {firstName}
    &apos;s items and information will be deleted from Huddle, and anyone with access to
    {' '}
    {firstName}
    ’s profile will no longer have access.
  </Text>
);

export default DeleteProfile;
