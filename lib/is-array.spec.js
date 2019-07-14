'use strict';

var isArray = require( './is-array' );

describe( 'isArray', function() {

  it( 'exists', function() {
    expect( isArray ).toBeDefined();
  } );

  it( 'is a function', function() {
    expect( isArray ).toBeInstanceOf( Function );
  } );

  it( 'returns true for array literals', function() {
    expect( isArray( [] ) ).toBe( true );
  } );

  it( 'returns true for objects constructed via Array', function() {
    // eslint-disable-next-line no-array-constructor
    expect( isArray( new Array() ) ).toBe( true );
  } );

  it( 'returns false for arguments object', function() {
    expect( isArray( arguments ) ).toBe( false );
  } );

  it( 'returns false for non-array objects with a length property', function() {
    expect( isArray( {
      length: 0,
    } ) ).toBe( false );
  } );

} );
