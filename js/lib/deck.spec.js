'use strict';

var expect = require( 'chai' ).expect;

var Deck = require( './deck' );

describe( 'Deck', function() {
  it( 'exists', function() {
    expect( Deck ).to.exist;
  });

  it( 'is a function', function() {
    expect( Deck ).to.be.a( 'function' );
  });

  it( 'is a Constructor', function() {
    var deck = new Deck();
    expect( deck instanceof Deck ).to.be.true;
  });

  describe( 'instance', function() {

    var deck;

    beforeEach(function() {
      deck = new Deck();
    });

    describe( '.cards()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'populates the deck with an array of cards' );

    });

    describe( '.shuffle()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'shuffles the order of the cards within the deck' );

    });

    describe( '.remaining', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'returns the number of cards remaining in the deck' );

    });

    describe( '.draw()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'draws (returns) one card object when called with no arguments' );

      it( 'removes the drawn card from the deck' );

      it( 'draws (returns) an array of n cards when called with a number n' );

      it( 'removes the drawn n cards from the deck' );

    });

    describe( '.drawNext()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'draws (returns) the next card in the deck that passes a filter function' );

      it( 'removes the drawn card from the deck' );

      it( 'draws (returns) an array of the next n cards passing a filter function' );

      it( 'removes the drawn n cards from the deck' );

    });

    describe( '.drawRandom()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'draws (returns) a random card in the deck' );

      it( 'removes the drawn card from the deck' );

      it( 'draws (returns) an array of n cards chosen randomly from the deck' );

      it( 'removes the drawn n cards from the deck' );

    });

    describe( '.drawFromBottom()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'draws (returns) one card object from the bottom of the deck' );

      it( 'removes the drawn card from the deck' );

      it( 'draws (returns) an array of n cards from the bottom of the deck' );

      it( 'removes the drawn n cards from the deck' );

    });

    describe( '.discard()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'returns a card object to the bottom of the deck' );

      it( 'returns an array of cards to the bottom of the deck in order' );

    });

    describe( '.shuffleToBottom()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'returns a card object to the bottom of the deck' );

      it( 'returns an array of cards to the bottom of the deck in random order' );

    });

    describe( '.discardToTop()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'returns a card object to the top of the deck' );

      it( 'returns an array of cards to the top of the deck in order' );

    });

    describe( '.shuffleToTop()', function() {

      it( 'exists' );

      it( 'is a function' );

      it( 'returns a card object to the top of the deck' );

      it( 'returns an array of cards to the top of the deck in random order' );

    });

  });

});
