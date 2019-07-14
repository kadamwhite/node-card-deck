'use strict';

// Use a seeded random number generator to remove randomness from the tests
var seededRandomNumber = require( './lib/seeded-random-number' );
var Deck = require( './deck' );

describe( 'Deck', function() {
  var deck;

  beforeEach( function() {
    jest.spyOn( Math, 'random' ).
      mockImplementation( () => seededRandomNumber.rand() );
    seededRandomNumber.setSeed( 0 );
  } );

  afterEach( function() {
    jest.restoreAllMocks();
  } );

  it( 'is a function', function() {
    expect( Deck ).toBeInstanceOf( Function );
  } );

  it( 'is a Constructor', function() {
    deck = new Deck();
    expect( deck instanceof Deck ).toBe( true );
  } );

  it( 'can take an array argument that is used to set the cards in the deck', function() {
    deck = new Deck( [ 'a', 'b', 'c' ] );
    expect( deck.top( 3 ) ).toEqual( [ 'a', 'b', 'c' ] );
  } );

  describe( 'state methods', function() {

    beforeEach( function() {
      deck = new Deck();
      deck.cards( [ 'a', 'b', 'c', 'd', 'e' ] );
    } );

    describe( '.cards()', function() {

      it( 'exists', function() {
        expect( deck.cards ).toBeDefined();
      } );

      it( 'is a function', function() {
        expect( deck.cards ).toBeInstanceOf( Function );
      } );

      it( 'populates the deck with an array of cards', function() {
        deck.cards( [ 'a', 'b', 'c', 'd' ] );
        expect( deck.remaining() ).toBe( 4 );
        expect( deck.top( 4 ) ).toEqual( [ 'a', 'b', 'c', 'd' ] );
      } );

      it( 'replaces the previous cards in the deck', function() {
        deck.cards( [ 'a', 'b', 'c', 'd' ] );
        deck.cards( [ 'e', 'f', 'g' ] );
        expect( deck.remaining() ).toBe( 3 );
        expect( deck.top( 3 ) ).toEqual( [ 'e', 'f', 'g' ] );
      } );

      it( 'can empty the deck if an empty array is provided', function() {
        deck.cards( [ 'a', 'b', 'c', 'd' ] );
        deck.cards( [] );
        expect( deck.remaining() ).toBe( 0 );
      } );

      it( 'has no effect if a non-array argument is provided', function() {
        deck.cards( [ 'a', 'b', 'c', 'd' ] );
        deck.cards( 'lali puna' );
        expect( deck.remaining() ).toBe( 4 );
        expect( deck.top( 4 ) ).toEqual( [ 'a', 'b', 'c', 'd' ] );
      } );

      it( 'is chainable', function() {
        expect( deck.cards() ).toBe( deck );
      } );

    } );

    describe( '.shuffle()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'shuffle' );
      } );

      it( 'is a function', function() {
        expect( deck.shuffle ).toBeInstanceOf( Function );
      } );

      it( 'shuffles the order of the cards within the deck', function() {
        // Seeded (predictable) randomness
        deck.shuffle();
        expect( deck.top( 5 ) ).toEqual( [ 'a', 'd', 'c', 'e', 'b' ] );
      } );

      it( 'is chainable', function() {
        expect( deck.shuffle() ).toBe( deck );
      } );

    } );

    describe( '.remaining', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'remaining' );
      } );

      it( 'is a function', function() {
        expect( deck.remaining ).toBeInstanceOf( Function );
      } );

      it( 'returns the number of cards remaining in the deck', function() {
        expect( deck.remaining() ).toBe( 5 );
        deck.cards( [] );
        expect( deck.remaining() ).toBe( 0 );
        deck.cards( [ 6, 7 ] );
        expect( deck.remaining() ).toBe( 2 );
      } );

    } );

  } );

  describe( 'card draw methods', function() {

    beforeEach( function() {
      deck = new Deck();
      deck.cards( [ 'a', 'b', 'c', 'd', 'e' ] );
    } );

    describe( '.draw()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'draw' );
      } );

      it( 'is a function', function() {
        expect( deck.draw ).toBeInstanceOf( Function );
      } );

      it( 'draws (returns) one card object when called with no arguments', function() {
        expect( deck.draw() ).toBe( 'a' );
      } );

      it( 'removes the drawn card from the deck', function() {
        deck.draw();
        expect( deck.remaining() ).toBe( 4 );
        expect( deck.top() ).toBe( 'b' );
      } );

      it( 'draws (returns) an array of n cards when called with a number n', function() {
        expect( deck.draw( 2 ) ).toEqual( [ 'a', 'b' ] );
        expect( deck.draw( 3 ) ).toEqual( [ 'c', 'd', 'e' ] );
      } );

      it( 'removes the drawn n cards from the deck', function() {
        deck.draw( 3 );
        expect( deck.remaining() ).toBe( 2 );
        expect( deck.top( 2 ) ).toEqual( [ 'd', 'e' ] );
      } );

      it( 'cannot draw more than the remaining number of cards', function() {
        expect( deck.draw( 1337 ) ).toEqual( [ 'a', 'b', 'c', 'd', 'e' ] );
        expect( deck.remaining() ).toBe( 0 );
      } );

      it( 'returns undefined if no cards remain', function() {
        deck.cards( [] );
        expect( deck.draw() ).toBeUndefined();
        expect( deck.draw( 2 ) ).toBeUndefined();
      } );

    } );

    describe( '.drawFromBottom()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'drawFromBottom' );
      } );

      it( 'is a function', function() {
        expect( deck.drawFromBottom ).toBeInstanceOf( Function );
      } );

      it( 'draws (returns) one card object from the bottom of the deck', function() {
        expect( deck.drawFromBottom() ).toBe( 'e' );
      } );

      it( 'removes the drawn card from the deck', function() {
        deck.drawFromBottom();
        expect( deck.remaining() ).toBe( 4 );
        expect( deck.bottom( 4 ) ).toEqual( [ 'd', 'c', 'b', 'a' ] );
      } );

      it( 'draws (returns) an array of n cards from the bottom of the deck', function() {
        expect( deck.drawFromBottom( 2 ) ).toEqual( [ 'e', 'd' ] );
        expect( deck.drawFromBottom( 3 ) ).toEqual( [ 'c', 'b', 'a' ] );
      } );

      it( 'removes the drawn n cards from the deck', function() {
        deck.drawFromBottom( 4 );
        expect( deck.remaining() ).toBe( 1 );
        expect( deck.top() ).toBe( deck.bottom() );
      } );

      it( 'cannot draw more than the remaining number of cards', function() {
        expect( deck.drawFromBottom( 1066 ) ).toEqual( [ 'e', 'd', 'c', 'b', 'a' ] );
        expect( deck.remaining() ).toBe( 0 );
      } );

      it( 'returns undefined if no cards remain', function() {
        deck.cards( [] );
        expect( deck.drawFromBottom() ).toBeUndefined();
        expect( deck.drawFromBottom( 2 ) ).toBeUndefined();
      } );

    } );

    describe( '.drawWhere()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'drawWhere' );
      } );

      it( 'is a function', function() {
        expect( deck.drawWhere ).toBeInstanceOf( Function );
      } );

      it( 'draws the next card in the deck that passes a filter function', function() {
        expect( deck.drawWhere( function( card ) {
          return card === 'd';
        } ) ).toBe( 'd' );
      } );

      it( 'removes the drawn card from the deck', function() {
        deck.drawWhere( function( card ) {
          return card === 'd';
        } );
        expect( deck.remaining() ).toBe( 4 );
        expect( deck.top( 4 ) ).toEqual( [ 'a', 'b', 'c', 'e' ] );
      } );

      it( 'draws an array of the next n cards passing a filter function', function() {
        expect( deck.drawWhere( function( card, index ) {
          return index % 2 === 1;
        }, 4 ) ).toEqual( [ 'b', 'd' ] );
      } );

      it( 'removes the drawn n cards from the deck', function() {
        deck.drawWhere( function( card ) {
          return ( /[aeiou]/ ).test( card );
        }, 2 );
        expect( deck.remaining() ).toBe( 3 );
        expect( deck.top( 3 ) ).toEqual( [ 'b', 'c', 'd' ] );
      } );

      it( 'cannot draw more than the remaining number of cards', function() {
        expect( deck.drawWhere( function() {
          return true;
        }, 100 ) ).toEqual( [ 'a', 'b', 'c', 'd', 'e' ] );
      } );

      it( 'returns undefined if no predicate function was provided', function() {
        expect( deck.drawWhere( 2 ) ).toBeUndefined();
      } );

      it( 'returns undefined if no matching cards are found', function() {
        expect( deck.drawWhere( function( card ) {
          return card === 'f';
        } ) ).toBeUndefined();
      } );

      it( 'returns undefined if no cards remain', function() {
        deck.cards( [] );
        function alwaysTrue() {
          return true;
        }
        expect( alwaysTrue() ).toBe( true );
        expect( deck.drawWhere( alwaysTrue ) ).toBeUndefined();
        expect( deck.drawWhere( alwaysTrue, 2 ) ).toBeUndefined();
      } );

    } );

    describe( '.drawRandom()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'drawRandom' );
      } );

      it( 'is a function', function() {
        expect( deck.drawRandom ).toBeInstanceOf( Function );
      } );

      it( 'draws a random card in the deck', function() {
        expect( deck.drawRandom() ).toBe( 'b' );
        expect( deck.drawRandom() ).toBe( 'c' );
        expect( deck.drawRandom() ).toBe( 'e' );
      } );

      it( 'removes the drawn card from the deck', function() {
        expect( deck.drawRandom() ).toBe( 'b' );
        expect( deck.remaining() ).toBe( 4 );
        expect( deck.top( 4 ) ).toEqual( [ 'a', 'c', 'd', 'e' ] );
      } );

      it( 'draws an array of n cards chosen randomly from the deck', function() {
        expect( deck.drawRandom( 2 ) ).toEqual( [ 'b', 'c' ] );
        expect( deck.drawRandom( 3 ) ).toEqual( [ 'e', 'd', 'a' ] );
      } );

      it( 'removes the drawn n cards from the deck', function() {
        expect( deck.drawRandom( 3 ) ).toEqual( [ 'b', 'c', 'e' ] );
        expect( deck.remaining() ).toBe( 2 );
        expect( deck.top( 2 ) ).toEqual( [ 'a', 'd' ] );
      } );

      it( 'cannot draw more than the remaining number of cards', function() {
        expect( deck.drawRandom( 100 ) ).toEqual( [ 'b', 'c', 'e', 'd', 'a' ] );
      } );

      it( 'returns undefined if the deck is empty', function() {
        deck.cards( [] );
        expect( deck.drawRandom() ).toBeUndefined();
        expect( deck.drawRandom( 2 ) ).toBeUndefined();
      } );

    } );

  } );

  describe( 'insert card methods', function() {

    beforeEach( function() {
      deck = new Deck();
      deck.cards( [ 'a', 'b', 'c', 'd', 'e' ] );
    } );

    describe( '.addToBottom()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'addToBottom' );
      } );

      it( 'is a function', function() {
        expect( deck.addToBottom ).toBeInstanceOf( Function );
      } );

      it( 'returns a card object to the bottom of the deck', function() {
        deck.addToBottom( 'f' );
        expect( deck.remaining() ).toBe( 6 );
        expect( deck.bottom() ).toBe( 'f' );
      } );

      it( 'returns an array of cards to the bottom of the deck in order', function() {
        deck.addToBottom( [ 'f', 'g', 'h', 'i' ] );
        expect( deck.remaining() ).toBe( 9 );
        expect( deck.bottom( 4 ) ).toEqual( [ 'i', 'h', 'g', 'f' ] );
      } );

      it( 'is chainable', function() {
        expect( deck.addToBottom() ).toBe( deck );
      } );

    } );

    describe( '.shuffleToBottom()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'shuffleToBottom' );
      } );

      it( 'is a function', function() {
        expect( deck.shuffleToBottom ).toBeInstanceOf( Function );
      } );

      it( 'returns a card object to the bottom of the deck', function() {
        deck.shuffleToBottom( 'bottomcard' );
        expect( deck.remaining() ).toBe( 6 );
        expect( deck.bottom() ).toBe( 'bottomcard' );
      } );

      it( 'returns an array of cards to the bottom of the deck in random order', function() {
        deck.shuffleToBottom( [ 'f', 'g', 'h', 'i' ] );
        expect( deck.remaining() ).toBe( 9 );
        expect( deck.top( 9 ) ).toEqual( [ 'a', 'b', 'c', 'd', 'e', 'h', 'g', 'i', 'f' ] );
      } );

      it( 'is chainable', function() {
        expect( deck.shuffleToBottom() ).toBe( deck );
      } );

    } );

    describe( '.addToTop()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'addToTop' );
      } );

      it( 'is a function', function() {
        expect( deck.addToTop ).toBeInstanceOf( Function );
      } );

      it( 'returns a card object to the top of the deck', function() {
        deck.addToTop( 'f' );
        expect( deck.remaining() ).toBe( 6 );
        expect( deck.top( 6 ) ).toEqual( [ 'f', 'a', 'b', 'c', 'd', 'e' ] );
      } );

      it( 'returns an array of cards to the top of the deck in order', function() {
        deck.addToTop( [ 'f', 'g', 'h' ] );
        expect( deck.remaining() ).toBe( 8 );
        expect( deck.top( 8 ) ).toEqual( [ 'f', 'g', 'h', 'a', 'b', 'c', 'd', 'e' ] );
      } );

      it( 'is chainable', function() {
        expect( deck.addToTop() ).toBe( deck );
      } );

    } );

    describe( '.shuffleToTop()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'shuffleToTop' );
      } );

      it( 'is a function', function() {
        expect( deck.shuffleToTop ).toBeInstanceOf( Function );
      } );

      it( 'returns a card object to the top of the deck', function() {
        deck.shuffleToTop( 'topcard' );
        expect( deck.top() ).toBe( 'topcard' );
      } );

      it( 'returns an array of cards to the top of the deck in random order', function() {
        deck.shuffleToTop( [ 'f', 'g', 'h' ] );
        expect( deck.remaining() ).toBe( 8 );
        expect( deck.top( 8 ) ).toEqual( [ 'g', 'h', 'f', 'a', 'b', 'c', 'd', 'e' ] );
      } );

      it( 'is chainable', function() {
        expect( deck.shuffleToTop() ).toBe( deck );
      } );

    } );

    describe( '.addRandom()', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'addRandom' );
      } );

      it( 'is a function', function() {
        expect( deck.addRandom ).toBeInstanceOf( Function );
      } );

      it( 'returns a card object to a random location within the deck', function() {
        deck.addRandom( 'f' );
        expect( deck.remaining() ).toBe( 6 );
        expect( deck.top( 6 ) ).toEqual( [ 'a', 'f', 'b', 'c', 'd', 'e' ] );
      } );

      it( 'returns an array of cards to random locations within the deck', function() {
        deck.addRandom( [ 'f', 'g', 'h' ] );
        expect( deck.remaining() ).toBe( 8 );
        expect( deck.top( 8 ) ).toEqual( [ 'a', 'g', 'f', 'b', 'c', 'h', 'd', 'e' ] );
      } );

      it( 'is chainable', function() {
        expect( deck.addRandom() ).toBe( deck );
      } );

    } );

  } );

  describe( 'peek card methods', function() {

    beforeEach( function() {
      deck = new Deck();
      deck.cards( [ 'a', 'b', 'c', 'd', 'e' ] );
    } );

    describe( '.top', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'top' );
      } );

      it( 'is a function', function() {
        expect( deck.top ).toBeInstanceOf( Function );
      } );

      it( 'returns the top card on the deck', function() {
        expect( deck.top() ).toBe( 'a' );
      } );

      it( 'does not remove the returned card from the deck', function() {
        deck.top();
        expect( deck.remaining() ).toBe( 5 );
      } );

      it( 'returns the top n cards on the deck', function() {
        expect( deck.top( 2 ) ).toEqual( [ 'a', 'b' ] );
        expect( deck.top( 4 ) ).toEqual( [ 'a', 'b', 'c', 'd' ] );
      } );

      it( 'does not remove the returned n cards from the deck', function() {
        deck.top( 4 );
        expect( deck.remaining() ).toBe( 5 );
      } );

      it( 'does not return more than the remaining number of cards', function() {
        expect( deck.top( 10 ) ).toEqual( [ 'a', 'b', 'c', 'd', 'e' ] );
      } );

      it( 'returns undefined if the deck is empty', function() {
        deck.cards( [] );
        expect( deck.top() ).toBeUndefined();
      } );

    } );

    describe( '.bottom', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'bottom' );
      } );

      it( 'is a function', function() {
        expect( deck.bottom ).toBeInstanceOf( Function );
      } );

      it( 'returns the bottom card on the deck', function() {
        expect( deck.bottom() ).toBe( 'e' );
      } );

      it( 'does not remove the returned card from the deck', function() {
        deck.bottom();
        expect( deck.remaining() ).toBe( 5 );
      } );

      it( 'returns the bottom n cards on the deck', function() {
        expect( deck.bottom( 2 ) ).toEqual( [ 'e', 'd' ] );
        expect( deck.bottom( 4 ) ).toEqual( [ 'e', 'd', 'c', 'b' ] );
      } );

      it( 'does not remove the returned n cards from the deck', function() {
        deck.bottom( 2 );
        expect( deck.remaining() ).toBe( 5 );
      } );

      it( 'returns cards in the reverse order from .top', function() {
        expect( deck.bottom( 5 ) ).toEqual( deck.top( 5 ).reverse() );
      } );

      it( 'does not return more than the remaining number of cards', function() {
        expect( deck.bottom( 10 ) ).toEqual( [ 'e', 'd', 'c', 'b', 'a' ] );
      } );

      it( 'returns undefined if the deck is empty', function() {
        deck.cards( [] );
        expect( deck.bottom() ).toBeUndefined();
      } );

    } );

    describe( '.random', function() {

      it( 'exists', function() {
        expect( deck ).toHaveProperty( 'random' );
      } );

      it( 'is a function', function() {
        expect( deck.random ).toBeInstanceOf( Function );
      } );

      it( 'returns a random card in the deck', function() {
        expect( deck.random() ).toBe( 'b' );
        expect( deck.random() ).toBe( 'b' );
        expect( deck.random() ).toBe( 'e' );
      } );

      it( 'does not remove the returned card from the deck', function() {
        deck.random();
        expect( deck.remaining() ).toBe( 5 );
      } );

      it( 'returns n random cards in the deck', function() {
        expect( deck.random( 2 ) ).toEqual( [ 'a', 'd' ] );
        expect( deck.random( 2 ) ).toEqual( [ 'a', 'c' ] );
      } );

      it( 'does not remove the returned n cards from the deck', function() {
        deck.random( 3 );
        expect( deck.remaining() ).toBe( 5 );
      } );

      it( 'does not return more than the remaining number of cards', function() {
        expect( deck.random( 10 ) ).toEqual( [ 'a', 'd', 'c', 'e', 'b' ] );
      } );

      it( 'returns undefined if the deck is empty', function() {
        deck.cards( [] );
        expect( deck.random() ).toBeUndefined();
      } );

    } );

  } );

  it( 'can be augmented by providing additional prototype methods', function() {
    deck = new Deck( [ 'a', 'b', 'c' ] );
    Deck.prototype.replace = function( cards ) {
      return this.addToTop( cards );
    };
    deck.replace( 'd' );
    expect( deck.remaining( 4 ) );
    expect( deck.top( 4 ) ).toEqual( [ 'd', 'a', 'b', 'c' ] );
  } );

} );
