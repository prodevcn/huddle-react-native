import differenceInYears from 'date-fns/differenceInYears';

export const getHumanAge = (dob) => {
  const timeNow = new Date();
  const humanAge = differenceInYears(timeNow, new Date(dob));

  if (humanAge <= 1) {
    return `${humanAge} year old`;
  }

  return `${humanAge} years old`;
};

export default getHumanAge;
