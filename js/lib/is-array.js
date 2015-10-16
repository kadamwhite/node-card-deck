'use strict';
// Logic adapted from https://github.com/lodash/lodash-compat/blob/master/lodash.js

var arrayTag = '[object Array]';

function isValidLength( val ) {
  // Ignoring the max-safe-integer rule because that's too many cards for any deck
  return typeof val === 'number' && val > -1 && val % 1 === 0;
}

function isObjecty( val ) {
  return ! ! val && typeof val === 'object';
}

function isArray( arr ) {
  var isObject =  isObjecty( arr );
  var hasLengthProperty = isValidLength( arr.length );
  return isObject && hasLengthProperty && Object.toString.call( arr ) === arrayTag;
}

// Try the native method first, then fall back to our back-compatibility method
module.exports = Array.isArray || isArray;
