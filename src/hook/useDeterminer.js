import { useSelector } from 'react-redux';
import { selectors } from '/state/profiles';
import { capitalize } from '/util';

// Just a helper hook to fetch the determiner from redux and capitalize it if
// the user wants it capitalized
export default (isCapitalized) => {
  const determiner = useSelector(selectors.determinerSelector);
  if (isCapitalized) {
    return capitalize(determiner);
  }

  return determiner;
};
