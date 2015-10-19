'use strict';
// Logic adapted from https://github.com/lodash/lodash-compat/blob/master/lodash.js
// As most of this is back-compatibility for older browsers, omit these
// impossible-to-test-in-modern-node paths from coverage reporting

var arrayTag = '[object Array]';

/* istanbul ignore next */
function isValidLength( val ) {
  // Ignoring the max-safe-integer rule because that's too many cards for any deck
  return typeof val === 'number' && val > -1 && val % 1 === 0;
}

/* istanbul ignore next */
function isObjecty( val ) {
  return ! ! val && typeof val === 'object';
}

/* istanbul ignore next */
function isArray( arr ) {
  var isObject =  isObjecty( arr );
  var hasLengthProperty = isValidLength( arr.length );
  return isObject && hasLengthProperty && Object.toString.call( arr ) === arrayTag;
}

/* istanbul ignore next */
// Try the native method first, then fall back to our back-compatibility method
module.exports = Array.isArray || isArray;
