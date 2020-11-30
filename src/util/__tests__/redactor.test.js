import redactor, { rules } from '../redactor';
import pii from './fixtures/pii.json';
import common from './fixtures/regexPatterns.json';

describe('PII Redactor - specific rule', () => {
  function testSuite(identifier) {
    const rule = rules[identifier];
    const identifierLabel = identifier.replace(/[_-]/g, ' ');
    function testAsserts(fixtureName) {
      const ruleLabel = fixtureName.replace(/[_-]/g, ' ');
      describe(`${identifierLabel} only -  ${ruleLabel}`, () => {
        const redact = redactor(pii[identifier][fixtureName], { source: 'internal' });
        test('test', () => {
          expect(redact.test(rule.pattern)).toBeTruthy();
        });

        test('replace', () => {
          expect(redact.replace(rule.pattern, rule.safe)).toBe(rule.safe);
        });

        test('sanitize', () => {
          expect(redact.sanitize()).toBe(rule.safe);
        });
      });

      describe(`${identifierLabel} in JSON - ${ruleLabel}`, () => {
        const response = {
          error: `SQL error due to duplicate user ${pii[identifier][fixtureName]} and ${pii[identifier][fixtureName]}.`,
          timestamp: '12313434234',
          transactionId: 'bb8602e6-e12b-40b5-948a-ce36c30bdb9c',
          profileCode: 'b4588438-e9f1-4694-bfd8-ab2cdfa5587e',
          code: '000-00-0000',
          status: '200',
        };
        const expected = {
          ...response,
          error: `SQL error due to duplicate user ${rule.safe} and ${rule.safe}.`,
        };

        test('test', () => {
          expect(redactor(response, { source: 'internal' }).test(rule.pattern)).toBeTruthy();
        });

        test('replace', () => {
          expect(redactor(response, { source: 'internal' }).replace(rule.pattern, rule.safe))
            .toStrictEqual(expected);
        });

        test('sanitize', () => {
          expect(redactor(response, { source: 'internal' }).sanitize()).toStrictEqual(expected);
        });
      });
    }

    Object.keys(pii[identifier]).forEach(testAsserts);
  }

  Object.keys(pii).forEach(testSuite);
});

describe('PII Redactor - all rules', () => {
  test('text only', () => {
    const received = redactor(`
      The quick brown fox with identity DAN_BROOKS_2020-10-20 jumps over the lazy dog to answer the
      call from (604) 123-1234 or send to dan.brooks@drfirst.com. Please sign up for Huddle Health (https://drfirst.com/)
    `, { source: 'internal' }).sanitize();

    const expected = `
      The quick brown fox with identity <FNAME>_<LNAME>_<DATE> jumps over the lazy dog to answer the
      call from <PHONE> or send to <EMAIL>. Please sign up for Huddle Health (<URL>)
    `;

    expect(received).toStrictEqual(expected);
  });

  test('JSON body', () => {
    const received = redactor({
      sentence: `
        The quick brown fox with identity DAN_BROOKS_2020-10-20 jumps over the lazy dog to answer the
        call from (604) 123-1234.
      `,
    }, { source: 'internal' }).sanitize();

    const expected = {
      sentence: `
        The quick brown fox with identity <FNAME>_<LNAME>_<DATE> jumps over the lazy dog to answer the
        call from <PHONE>.
      `,
    };

    expect(received).toStrictEqual(expected);
  });
});

describe('Common Redactor with Public Input', () => {
  function testSuite(identifier) {
    const identifierLabel = identifier.replace(/[_-]/g, ' ');

    function testAsserts(fixtureName) {
      const fixture = common[identifier][fixtureName];
      const patternName = fixtureName.replace(/[_-]/g, ' ');

      if (fixture.test) {
        const testWord = (fixture.find) ? fixture.find : fixture.test;
        test(`${identifierLabel} only -  ${patternName}`, () => {
          expect(redactor(fixture.test).test(testWord, fixture.flags)).toBeTruthy();
        });

        test(`${identifierLabel} JSON -  ${patternName}`, () => {
          expect(
            redactor({ message: `Hello ${fixture.test} World` }).test(testWord, fixture.flags),
          ).toBeTruthy();
        });
      }
    }

    Object.keys(common[identifier]).forEach(testAsserts);
  }

  Object.keys(common).forEach(testSuite);
});
