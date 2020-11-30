/**
 * This recursive function will return a Text[] that will be split up
 * by fuzzy matches. The matching substrings will be highlighted,
 * and the rest will be the normal font
 *
 * There are two escape conditions for this recursion:
 *   1. `current` does not contain the first character of `matcher`
 *   2. `matcher` is empty
 */

import React from 'react';

import Text from '/component/Text';
import globalStyles from '/styles';
/**
 * Get an Text[] where any substrings of `current` that match
 * `matcher` are highlighted
 *
 * @param {string} current the string we want to match on (against?)
 * @param {string} matcher the current value we are matching
 * @param {Text[]} parts an array of strings that represent the
 * composition of our matches
 */
const highlightMatches = (current, matcher, parts = [], level = 0) => {
  // Does our current string contain the first character of the current
  // matcher? If so, we will keep going to see if we can match even more characters
  // otherwise we will return what we currently have matched
  const match = current.match(new RegExp(`[${matcher[0]}]`, 'i'));

  if (matcher && match) {
    // Before is the section of the string before the match (not highlighted)
    const before = current.substring(0, match.index);
    let matched = current.substring(match.index);

    // Figure out how many characters match. It goes until it find a non-matching character
    let i = 0;
    while (i < matcher.length) {
      if ((matched[i] || '').toLowerCase() !== (matcher[i] || '').toLowerCase()) {
        break;
      }
      i += 1;
    }

    // After is the section of the string after the maximum match (not highlighted)
    const after = matched.substring(i);
    // matched will be `current.substring(match.index, i)` (highlighted)
    matched = matched.substring(0, i);

    // Concat our before an matched to the parts array
    const newParts = [
      ...parts,
      <Text.Plain key={`before-${level}`}>{before}</Text.Plain>,
      <Text.Plain style={{ color: globalStyles.palette.teal }} key={`match-${level}`}>
        {matched}
      </Text.Plain>,
    ];

    const newMatcher = matcher.substring(i);
    // Once we have matched the entire `matcher`, stick the `after` on to the
    // end of the array and return it. No more recursion!
    if (!newMatcher) {
      return [...newParts, <Text.Plain key={`after-${level}`}>{after}</Text.Plain>];
    }

    // Otherwise make a new recursive call, using the values from this call
    return highlightMatches(after, newMatcher, [...newParts], level + 1);
  }

  // If we don't have a match, return any parts that have matched, *or* the current string
  if (parts.length) return parts;
  return <Text.Plain key="current">{current}</Text.Plain>;
};

export default highlightMatches;
