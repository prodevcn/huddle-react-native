import React from 'react';

import globalStyles from '/styles';
import Text from '/component/Text';
import useDeterminer from '/hook/useDeterminer';

const EmptyCareTeam = () => {
  const determiner = useDeterminer();
  return (
    <Text weight="regular" fontSize={18} lineHeight={24} color={globalStyles.palette.grey01}>
      Invites others to be a member of
      {' '}
      {determiner}
      {' '}
      Care Team, they will have full access to all
      {' '}
      {determiner}
      {' '}
      health
      items.
    </Text>
  );
};

export default EmptyCareTeam;
