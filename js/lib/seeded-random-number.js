/**
 * Linear Congruential Generator (Variant of a Lehman Generator)
 * @module lib/seeded-random-number
 */
'use strict';

// This code has been adapted from p5.js and is used pursuant to the terms of
// the LGPL license under which p5 is released. Original source:
// https://github.com/processing/p5.js/blob/master/src/math/random.js

// Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
// m is basically chosen to be large (as it is the max period)
// and for its relationships to a and c
var m = 4294967296;
// a - 1 should be divisible by m's prime factors
var a = 1664525;
// c and m should be co-prime
var c = 1013904223;
var seed;
var z;

var lcg = {};

lcg.setSeed = function( val ) {
  // pick a random seed if val is undefined or null
  // the >>> 0 casts the seed to an unsigned 32-bit integer
  z = seed = ( val == null ? Math.random() * m : val ) >>> 0;
};

lcg.getSeed = function() {
  return seed;
};

lcg.rand = function() {
  // define the recurrence relationship
  z = ( a * z + c ) % m;
  // return a float in [0, 1)
  // if z = m then z / m = 0 therefore (z % m) / m < 1 always
  return z / m;
};

lcg.makeMock = function( seed ) {
  lcg.setSeed( seed );
  function mockRandomNumber() {
    return lcg.rand();
  }
  // For proxyquire
  mockRandomNumber['@noCallThru'] = true;
  return mockRandomNumber;
};

module.exports = lcg;
