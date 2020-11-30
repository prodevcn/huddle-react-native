import xRegExp from 'xregexp';

// 17 identifiers in HIPAA standard (phone, DOB, internet addresses, home address, name etc)
// or any identifier linked to PHI such as patient ID, prescription ID medication ID etc

export const rules = {
  email: {
    pattern: /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g,
    safe: '<EMAIL>',
  },
  phone: {
    pattern: /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}|\b\d{10}\b/g,
    safe: '<PHONE>',
  },
  url: {
    pattern: /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/g,
    safe: '<URL>',
  },
  userIdentifier: {
    pattern: /[^_# ]+_[^_#]+_\d{4}-\d{2}-\d{2}(#\d{1,2})*/g,
    safe: '<FNAME>_<LNAME>_<DATE>',
  },
};

export function escapeRegExp(string) {
  // The combination of the global flag `/g` and `\\$&` will replace all matched
  // occurrences Eg: `*(a)` -> `\*\(a\)`
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Input containing text with possible sensitive info (e.g. PHI, PII)
 * @param {string|object} rawBody
 * @param {object} [options]
 * @param {string} [options.source=public] `public` input could be an attack so escape it, or
 * `internal` input as the safest and trustworthy, or `external` coming from the Huddle backend
 * @returns {object()}
 */
export default function redactor(rawBody, options = { source: 'public' }) {
  const isObject = rawBody === Object(rawBody);
  const body = (isObject) ? JSON.stringify(rawBody) : rawBody;

  return {
    /**
     * Determines if PII is found in text
     * @param {string} pattern
     * @param {string} [flags]
     * @returns {boolean}
     */
    test: (rawPattern, flags) => {
      const escapedPattern = (options.source === 'public') ? escapeRegExp(rawPattern) : rawPattern;
      return xRegExp(new RegExp(escapedPattern, flags)).test(body);
    },
    /**
     * Applies one PII redaction rule and replaces all with a safe redacted replacement. All
     * occurrences are replaced of the one replacement rule
     * @param pattern
     * @param safe
     * @returns {string|object}
     */
    replace: (pattern, safe) => {
      const safeBody = xRegExp.replace(body, pattern, safe);
      return (isObject) ? JSON.parse(safeBody) : safeBody;
    },
    /**
     * Applies all PII redaction rules and replaces will a safe redacted replacement. All
     * occurrences are replaced of all replacement rules
     * @returns {string|object}
     */
    sanitize: () => {
      const safeBody = Object.values(rules).reduce((accumulator, rule) =>
        xRegExp.replace(accumulator, rule.pattern, rule.safe), body);

      return (isObject) ? JSON.parse(safeBody) : safeBody;
    },
  };
}
