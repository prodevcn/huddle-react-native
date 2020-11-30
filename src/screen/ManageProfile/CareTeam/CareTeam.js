import React from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';


import { careTeamListSelector } from '/state/careTeam/careTeam.selectors';
import CareTeamMember from '../CareTeamMember';
import EmptyCareTeam from './EmptyCareTeam';

const CareTeam = ({
  navigation,
}) => {
  const list = useSelector(careTeamListSelector);

  if (isEmpty(list)) {
    return <EmptyCareTeam />;
  }

  return (
    <>
      {list.map((user) => (
        <CareTeamMember
          key={user.email}
          navigation={navigation}
          {...user}
        />
      ))}
    </>
  );
};

export default CareTeam;
