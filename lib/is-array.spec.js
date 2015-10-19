'use strict';

var expect = require( 'chai' ).expect;

var isArray = require( './is-array' );

describe( 'isArray', function() {

  it( 'exists', function() {
    expect( isArray ).to.exist;
  });

  it( 'is a function', function() {
    expect( isArray ).to.be.a.function;
  });

  it( 'returns true for array literals', function() {
    expect( isArray([]) ).to.be.true;
  });

  it( 'returns true for objects constructed via Array', function() {
    // Suppress jshint error about use of Array constructor: we're proving a point
    /*jshint -W009 */
    expect( isArray( new Array() ) ).to.be.true;
  });

  it( 'returns false for arguments object', function() {
    expect( isArray( arguments ) ).to.be.false;
  });

  it( 'returns false for non-array objects with a length property', function() {
    expect( isArray({
      length: 0
    }) ).to.be.false;
  });

});
