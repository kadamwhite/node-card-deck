'use strict';

const seededRandomNumber = require( './seeded-random-number' );

describe( 'seeded-random-number', () => {
  it( 'lets you set & retrieve the seed', () => {
    seededRandomNumber.setSeed( 52 );
    expect( seededRandomNumber.getSeed() ).toBe( 52 );
  } );
  it( 'generates a predictable string of numbers', () => {
    seededRandomNumber.setSeed( 0 );
    expect( Array.from( { length: 10 }, seededRandomNumber.rand ) ).toEqual( [
      0.23606797284446657,
      0.278566908556968,
      0.8195337599609047,
      0.6678668977692723,
      0.3840773708652705,
      0.6218074872158468,
      0.3437259302008897,
      0.6400356087833643,
      0.5077781022991985,
      0.5817975462414324,
    ] );
    seededRandomNumber.setSeed( 2501 );
    expect( Array.from( { length: 10 }, seededRandomNumber.rand ) ).toEqual( [
      0.20533659309148788,
      0.1286835817154497,
      0.2749228817410767,
      0.2457980385515839,
      0.21618804801255465,
      0.6466860703658313,
      0.3673436581157148,
      0.9385930330026895,
      0.8043267745524645,
      0.2604799137916416,
    ] );
    seededRandomNumber.setSeed( 0 );
    expect( Array.from( { length: 10 }, seededRandomNumber.rand ) ).toEqual( [
      0.23606797284446657,
      0.278566908556968,
      0.8195337599609047,
      0.6678668977692723,
      0.3840773708652705,
      0.6218074872158468,
      0.3437259302008897,
      0.6400356087833643,
      0.5077781022991985,
      0.5817975462414324,
    ] );
  } );
} );
