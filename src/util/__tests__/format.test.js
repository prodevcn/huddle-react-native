import format from '../format';

describe('Time format', () => {
  test('Leading Zero minute', () => {
    const leadingZeroMinute = new Date('November 13, 2019 08:01:23');
    expect(format.toTime(leadingZeroMinute)).toBe('8:01am');
  });

  test('Double digit minute', () => {
    const leadingZeroMinute = new Date('November 13, 2019 08:12:34');
    expect(format.toTime(leadingZeroMinute)).toBe('8:12am');
  });
});
