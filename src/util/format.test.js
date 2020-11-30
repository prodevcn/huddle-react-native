import format from './format';

describe('getLineNumber()', () => {
  describe('when there is US country code', () => {
    describe('when there is plus in phone number', () => {
      const INPUT_PHONE_NUMBER = '+1888-111-55-11';

      it('returns correct line number', () => {
        expect(format.getLineNumber(INPUT_PHONE_NUMBER)).toBe('888-111-55-11');
      });
    });

    describe('when there is not plus in phone number', () => {
      const INPUT_PHONE_NUMBER = '1888-111-55-11';

      it('returns correct line number', () => {
        expect(format.getLineNumber(INPUT_PHONE_NUMBER)).toBe('888-111-55-11');
      });
    });
  });

  describe('when there is not US country code', () => {
    describe('when phone number is line number', () => {
      const INPUT_PHONE_NUMBER = '8881115511';

      it('returns correct line number', () => {
        expect(format.getLineNumber(INPUT_PHONE_NUMBER)).toBe(INPUT_PHONE_NUMBER);
      });
    });

    describe('when there is not different country code', () => {
      const INPUT_PHONE_NUMBER = '+7-888-111-55-11';

      it('returns phone number w/o any changes', () => {
        expect(format.getLineNumber(INPUT_PHONE_NUMBER)).toBe(INPUT_PHONE_NUMBER);
      });
    });
  });
});
