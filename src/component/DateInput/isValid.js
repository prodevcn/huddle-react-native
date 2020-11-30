// Check if the current entered value is valid
export default (text) => {
  const blocks = text.split('/');
  const monthStr = blocks[0] || text;
  const dayStr = blocks[1] || '';
  const yearStr = blocks[2] || '';

  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (yearStr.length > 4) return false;

  if (month && month > 12) return false;
  // We don't want the first character in a month to be > 1
  if (monthStr.length === 1 && month > 1) return false;
  // 0 is not a valid month
  if (monthStr.length === 2 && month < 1) return false;
  // We don't want the first character in a day to be > 3
  if (dayStr.length === 1 && day > 3) return false;
  // 0 is not a valid day
  if (dayStr.length === 2 && day < 1) return false;

  // Special case for the special month ;)
  if (month === 2 && day <= 29) return true;

  const now = new Date();
  // Figure out how many days are in the entered month. We will need to
  // validate leap years once the full date is entered so we have the year
  const daysInMonth = new Date(now.getFullYear(), month, 0).getDate();

  if (day > daysInMonth) return false;

  return true;
};
