'use strict';

var expect = require( 'chai' ).expect;
var proxyquire = require( 'proxyquire' );

// Use a seeded random number generator to remove randomness from the tests
var seededRandomNumber = require( './lib/seeded-random-number' );
var Deck = proxyquire( './deck', {
  './lib/random-number': seededRandomNumber.makeMock()
});

describe( 'Deck', function() {
  var deck;

  beforeEach(function() {
    seededRandomNumber.setSeed( 0 );
    expect( seededRandomNumber.getSeed() ).to.equal( 0 );
  });

  it( 'exists', function() {
    expect( Deck ).to.exist;
  });

  it( 'is a function', function() {
    expect( Deck ).to.be.a( 'function' );
  });

  it( 'is a Constructor', function() {
    deck = new Deck();
    expect( deck instanceof Deck ).to.be.true;
  });

  it( 'can take an array argument that is used to set the cards in the deck', function() {
    deck = new Deck([ 'a', 'b', 'c' ]);
    expect( deck.top( 3 ) ).to.deep.equal([ 'a', 'b', 'c' ]);
  });

  describe( 'state methods', function() {

    beforeEach(function() {
      deck = new Deck();
      deck.cards([ 'a', 'b', 'c', 'd', 'e' ]);
    });

    describe( '.cards()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'cards' );
      });

      it( 'is a function', function() {
        expect( deck.cards ).to.be.a( 'function' );
      });

      it( 'populates the deck with an array of cards', function() {
        deck.cards([ 'a', 'b', 'c', 'd' ]);
        expect( deck.remaining() ).to.equal( 4 );
        expect( deck.top( 4 ) ).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
      });

      it( 'replaces the previous cards in the deck', function() {
        deck.cards([ 'a', 'b', 'c', 'd' ]);
        deck.cards([ 'e', 'f', 'g' ]);
        expect( deck.remaining() ).to.equal( 3 );
        expect( deck.top( 3 ) ).to.deep.equal([ 'e', 'f', 'g' ]);
      });

      it( 'can empty the deck if an empty array is provided', function() {
        deck.cards([ 'a', 'b', 'c', 'd' ]);
        deck.cards([]);
        expect( deck.remaining() ).to.equal( 0 );
      });

      it( 'has no effect if a non-array argument is provided', function() {
        deck.cards([ 'a', 'b', 'c', 'd' ]);
        deck.cards( 'lali puna' );
        expect( deck.remaining() ).to.equal( 4 );
        expect( deck.top( 4 ) ).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
      });

      it( 'is chainable', function() {
        expect( deck.cards() ).to.equal( deck );
      });

    });

    describe( '.shuffle()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'shuffle' );
      });

      it( 'is a function', function() {
        expect( deck.shuffle ).to.be.a( 'function' );
      });

      it( 'shuffles the order of the cards within the deck', function() {
        // Seeded (predictable) randomness
        deck.shuffle();
        expect( deck.top( 5 ) ).to.deep.equal([ 'a', 'd', 'c', 'e', 'b' ]);
      });

      it( 'is chainable', function() {
        expect( deck.shuffle() ).to.equal( deck );
      });

    });

    describe( '.remaining', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'remaining' );
      });

      it( 'is a function', function() {
        expect( deck.remaining ).to.be.a( 'function' );
      });

      it( 'returns the number of cards remaining in the deck', function() {
        expect( deck.remaining() ).to.equal( 5 );
        deck.cards([]);
        expect( deck.remaining() ).to.equal( 0 );
        deck.cards([ 6, 7 ]);
        expect( deck.remaining() ).to.equal( 2 );
      });

    });

  });

  describe( 'card draw methods', function() {

    beforeEach(function() {
      deck = new Deck();
      deck.cards([ 'a', 'b', 'c', 'd', 'e' ]);
    });

    describe( '.draw()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'draw' );
      });

      it( 'is a function', function() {
        expect( deck.draw ).to.be.a( 'function' );
      });

      it( 'draws (returns) one card object when called with no arguments', function() {
        expect( deck.draw() ).to.equal( 'a' );
      });

      it( 'removes the drawn card from the deck', function() {
        deck.draw();
        expect( deck.remaining() ).to.equal( 4 );
        expect( deck.top() ).to.equal( 'b' );
      });

      it( 'draws (returns) an array of n cards when called with a number n', function() {
        expect( deck.draw( 2 ) ).to.deep.equal([ 'a', 'b' ]);
        expect( deck.draw( 3 ) ).to.deep.equal([ 'c', 'd', 'e' ]);
      });

      it( 'removes the drawn n cards from the deck', function() {
        deck.draw( 3 );
        expect( deck.remaining() ).to.equal( 2 );
        expect( deck.top( 2 ) ).to.deep.equal([ 'd', 'e' ]);
      });

      it( 'cannot draw more than the remaining number of cards', function() {
        expect( deck.draw( 1337 ) ).to.deep.equal([ 'a', 'b', 'c', 'd', 'e' ]);
        expect( deck.remaining() ).to.equal( 0 );
      });

      it( 'returns undefined if no cards remain', function() {
        deck.cards([]);
        expect( deck.draw() ).to.be.undefined;
        expect( deck.draw( 2 ) ).to.be.undefined;
      });

    });

    describe( '.drawFromBottom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'drawFromBottom' );
      });

      it( 'is a function', function() {
        expect( deck.drawFromBottom ).to.be.a( 'function' );
      });

      it( 'draws (returns) one card object from the bottom of the deck', function() {
        expect( deck.drawFromBottom() ).to.equal( 'e' );
      });

      it( 'removes the drawn card from the deck', function() {
        deck.drawFromBottom();
        expect( deck.remaining() ).to.equal( 4 );
        expect( deck.bottom( 4 ) ).to.deep.equal([ 'd', 'c', 'b', 'a' ]);
      });

      it( 'draws (returns) an array of n cards from the bottom of the deck', function() {
        expect( deck.drawFromBottom( 2 ) ).to.deep.equal([ 'e', 'd' ]);
        expect( deck.drawFromBottom( 3 ) ).to.deep.equal([ 'c', 'b', 'a' ]);
      });

      it( 'removes the drawn n cards from the deck', function() {
        deck.drawFromBottom( 4 );
        expect( deck.remaining() ).to.equal( 1 );
        expect( deck.top() ).to.equal( deck.bottom() );
      });

      it( 'cannot draw more than the remaining number of cards', function() {
        expect( deck.drawFromBottom( 1066 ) ).to.deep.equal([ 'e', 'd', 'c', 'b', 'a' ]);
        expect( deck.remaining() ).to.equal( 0 );
      });

      it( 'returns undefined if no cards remain', function() {
        deck.cards([]);
        expect( deck.drawFromBottom() ).to.be.undefined;
        expect( deck.drawFromBottom( 2 ) ).to.be.undefined;
      });

    });

    describe( '.drawWhere()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'drawWhere' );
      });

      it( 'is a function', function() {
        expect( deck.drawWhere ).to.be.a( 'function' );
      });

      it( 'draws the next card in the deck that passes a filter function', function() {
        expect( deck.drawWhere(function( card ) {
          return card === 'd';
        }) ).to.equal( 'd' );
      });

      it( 'removes the drawn card from the deck', function() {
        deck.drawWhere(function( card ) {
          return card === 'd';
        });
        expect( deck.remaining() ).to.equal( 4 );
        expect( deck.top( 4 ) ).to.deep.equal([ 'a', 'b', 'c', 'e' ]);
      });

      it( 'draws an array of the next n cards passing a filter function', function() {
        expect( deck.drawWhere(function( card, index ) {
          return index % 2 === 1;
        }, 4 ) ).to.deep.equal([ 'b', 'd' ]);
      });

      it( 'removes the drawn n cards from the deck', function() {
        deck.drawWhere(function( card ) {
          return /[aeiou]/.test( card );
        }, 2 );
        expect( deck.remaining() ).to.equal( 3 );
        expect( deck.top( 3 ) ).to.deep.equal([ 'b', 'c', 'd' ]);
      });

      it( 'cannot draw more than the remaining number of cards', function() {
        expect( deck.drawWhere(function() {
          return true;
        }, 100 ) ).to.deep.equal([ 'a', 'b', 'c', 'd', 'e' ]);
      });

      it( 'returns undefined if no predicate function was provided', function() {
        expect( deck.drawWhere( 2 ) ).to.be.undefined;
      });

      it( 'returns undefined if no matching cards are found', function() {
        expect( deck.drawWhere(function( card ) {
          return card === 'f';
        }) ).to.be.undefined;
      });

      it( 'returns undefined if no cards remain', function() {
        deck.cards([]);
        function alwaysTrue() {
          return true;
        }
        expect( alwaysTrue() ).to.equal.true;
        expect( deck.drawWhere( alwaysTrue ) ).to.be.undefined;
        expect( deck.drawWhere( alwaysTrue, 2 ) ).to.be.undefined;
      });

    });

    describe( '.drawRandom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'drawRandom' );
      });

      it( 'is a function', function() {
        expect( deck.drawRandom ).to.be.a( 'function' );
      });

      it( 'draws a random card in the deck', function() {
        expect( deck.drawRandom() ).to.equal( 'b' );
        expect( deck.drawRandom() ).to.equal( 'c' );
        expect( deck.drawRandom() ).to.equal( 'e' );
      });

      it( 'removes the drawn card from the deck', function() {
        expect( deck.drawRandom() ).to.equal( 'b' );
        expect( deck.remaining() ).to.equal( 4 );
        expect( deck.top( 4 ) ).to.deep.equal([ 'a', 'c', 'd', 'e' ]);
      });

      it( 'draws an array of n cards chosen randomly from the deck', function() {
        expect( deck.drawRandom( 2 ) ).to.deep.equal([ 'b', 'c' ]);
        expect( deck.drawRandom( 3 ) ).to.deep.equal([ 'e', 'd', 'a' ]);
      });

      it( 'removes the drawn n cards from the deck', function() {
        expect( deck.drawRandom( 3 ) ).to.deep.equal([ 'b', 'c', 'e' ]);
        expect( deck.remaining() ).to.equal( 2 );
        expect( deck.top( 2 ) ).to.deep.equal([ 'a', 'd' ]);
      });

      it( 'cannot draw more than the remaining number of cards', function() {
        expect( deck.drawRandom( 100 ) ).to.deep.equal([ 'b', 'c', 'e', 'd', 'a' ]);
      });

      it( 'returns undefined if the deck is empty', function() {
        deck.cards([]);
        expect( deck.drawRandom() ).to.be.undefined;
        expect( deck.drawRandom( 2 ) ).to.be.undefined;
      });

    });

  });

  describe( 'insert card methods', function() {

    beforeEach(function() {
      deck = new Deck();
      deck.cards([ 'a', 'b', 'c', 'd', 'e' ]);
    });

    describe( '.addToBottom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'addToBottom' );
      });

      it( 'is a function', function() {
        expect( deck.addToBottom ).to.be.a( 'function' );
      });

      it( 'returns a card object to the bottom of the deck', function() {
        deck.addToBottom( 'f' );
        expect( deck.remaining() ).to.equal( 6 );
        expect( deck.bottom() ).to.equal( 'f' );
      });

      it( 'returns an array of cards to the bottom of the deck in order', function() {
        deck.addToBottom([ 'f', 'g', 'h', 'i' ]);
        expect( deck.remaining() ).to.equal( 9 );
        expect( deck.bottom( 4 ) ).to.deep.equal([ 'i', 'h', 'g', 'f' ]);
      });

      it( 'is chainable', function() {
        expect( deck.addToBottom() ).to.equal( deck );
      });

    });

    describe( '.shuffleToBottom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'shuffleToBottom' );
      });

      it( 'is a function', function() {
        expect( deck.shuffleToBottom ).to.be.a( 'function' );
      });

      it( 'returns a card object to the bottom of the deck', function() {
        deck.shuffleToBottom( 'bottomcard' );
        expect( deck.remaining() ).to.equal( 6 );
        expect( deck.bottom() ).to.equal( 'bottomcard' );
      });

      it( 'returns an array of cards to the bottom of the deck in random order', function() {
        deck.shuffleToBottom([ 'f', 'g', 'h', 'i' ]);
        expect( deck.remaining() ).to.equal( 9 );
        expect( deck.top( 9 ) ).to.deep.equal([ 'a', 'b', 'c', 'd', 'e', 'h', 'g', 'i', 'f' ]);
      });

      it( 'is chainable', function() {
        expect( deck.shuffleToBottom() ).to.equal( deck );
      });

    });

    describe( '.addToTop()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'addToTop' );
      });

      it( 'is a function', function() {
        expect( deck.addToTop ).to.be.a( 'function' );
      });

      it( 'returns a card object to the top of the deck', function() {
        deck.addToTop( 'f' );
        expect( deck.remaining() ).to.equal( 6 );
        expect( deck.top( 6 ) ).to.deep.equal([ 'f', 'a', 'b', 'c', 'd', 'e' ]);
      });

      it( 'returns an array of cards to the top of the deck in order', function() {
        deck.addToTop([ 'f', 'g', 'h' ]);
        expect( deck.remaining() ).to.equal( 8 );
        expect( deck.top( 8 ) ).to.deep.equal([ 'f', 'g', 'h', 'a', 'b', 'c', 'd', 'e' ]);
      });

      it( 'is chainable', function() {
        expect( deck.addToTop() ).to.equal( deck );
      });

    });

    describe( '.shuffleToTop()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'shuffleToTop' );
      });

      it( 'is a function', function() {
        expect( deck.shuffleToTop ).to.be.a( 'function' );
      });

      it( 'returns a card object to the top of the deck', function() {
        deck.shuffleToTop( 'topcard' );
        expect( deck.top() ).to.equal( 'topcard' );
      });

      it( 'returns an array of cards to the top of the deck in random order', function() {
        deck.shuffleToTop([ 'f', 'g', 'h' ]);
        expect( deck.remaining() ).to.equal( 8 );
        expect( deck.top( 8 ) ).to.deep.equal([ 'g', 'h', 'f', 'a', 'b', 'c', 'd', 'e' ]);
      });

      it( 'is chainable', function() {
        expect( deck.shuffleToTop() ).to.equal( deck );
      });

    });

    describe( '.addRandom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'addRandom' );
      });

      it( 'is a function', function() {
        expect( deck.addRandom ).to.be.a( 'function' );
      });

      it( 'returns a card object to a random location within the deck', function() {
        deck.addRandom( 'f' );
        expect( deck.remaining() ).to.equal( 6 );
        expect( deck.top( 6 ) ).to.deep.equal([ 'a', 'f', 'b', 'c', 'd', 'e' ]);
      });

      it( 'returns an array of cards to random locations within the deck', function() {
        deck.addRandom([ 'f', 'g', 'h' ]);
        expect( deck.remaining() ).to.equal( 8 );
        expect( deck.top( 8 ) ).to.deep.equal([ 'a', 'g', 'f', 'b', 'c', 'h', 'd', 'e' ]);
      });

      it( 'is chainable', function() {
        expect( deck.addRandom() ).to.equal( deck );
      });

    });

  });

  describe( 'peek card methods', function() {

    beforeEach(function() {
      deck = new Deck();
      deck.cards([ 'a', 'b', 'c', 'd', 'e' ]);
    });

    describe( '.top', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'top' );
      });

      it( 'is a function', function() {
        expect( deck.top ).to.be.a( 'function' );
      });

      it( 'returns the top card on the deck', function() {
        expect( deck.top() ).to.equal( 'a' );
      });

      it( 'does not remove the returned card from the deck', function() {
        deck.top();
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'returns the top n cards on the deck', function() {
        expect( deck.top( 2 ) ).to.deep.equal([ 'a', 'b' ]);
        expect( deck.top( 4 ) ).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
      });

      it( 'does not remove the returned n cards from the deck', function() {
        deck.top( 4 );
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'does not return more than the remaining number of cards', function() {
        expect( deck.top( 10 ) ).to.deep.equal([ 'a', 'b', 'c', 'd', 'e' ]);
      });

      it( 'returns undefined if the deck is empty', function() {
        deck.cards([]);
        expect( deck.top() ).to.be.undefined;
      });

    });

    describe( '.bottom', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'bottom' );
      });

      it( 'is a function', function() {
        expect( deck.bottom ).to.be.a( 'function' );
      });

      it( 'returns the bottom card on the deck', function() {
        expect( deck.bottom() ).to.equal( 'e' );
      });

      it( 'does not remove the returned card from the deck', function() {
        deck.bottom();
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'returns the bottom n cards on the deck', function() {
        expect( deck.bottom( 2 ) ).to.deep.equal([ 'e', 'd' ]);
        expect( deck.bottom( 4 ) ).to.deep.equal([ 'e', 'd', 'c', 'b' ]);
      });

      it( 'does not remove the returned n cards from the deck', function() {
        deck.bottom( 2 );
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'returns cards in the reverse order from .top', function() {
        expect( deck.bottom( 5 ) ).to.deep.equal( deck.top( 5 ).reverse() );
      });

      it( 'does not return more than the remaining number of cards', function() {
        expect( deck.bottom( 10 ) ).to.deep.equal([ 'e', 'd', 'c', 'b', 'a' ]);
      });

      it( 'returns undefined if the deck is empty', function() {
        deck.cards([]);
        expect( deck.bottom() ).to.be.undefined;
      });

    });

    describe( '.random', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'random' );
      });

      it( 'is a function', function() {
        expect( deck.random ).to.be.a( 'function' );
      });

      it( 'returns a random card in the deck', function() {
        expect( deck.random() ).to.equal( 'b' );
        expect( deck.random() ).to.equal( 'b' );
        expect( deck.random() ).to.equal( 'e' );
      });

      it( 'does not remove the returned card from the deck', function() {
        deck.random();
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'returns n random cards in the deck', function() {
        expect( deck.random( 2 ) ).to.deep.equal([ 'a', 'd' ]);
        expect( deck.random( 2 ) ).to.deep.equal([ 'a', 'c' ]);
      });

      it( 'does not remove the returned n cards from the deck', function() {
        deck.random( 3 );
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'does not return more than the remaining number of cards', function() {
        expect( deck.random( 10 ) ).to.deep.equal([ 'a', 'd', 'c', 'e', 'b' ]);
      });

      it( 'returns undefined if the deck is empty', function() {
        deck.cards([]);
        expect( deck.random() ).to.be.undefined;
      });

    });

  });

  it( 'can be augmented by providing additional prototype methods', function() {
    deck = new Deck([ 'a', 'b', 'c' ]);
    Deck.prototype.replace = function( cards ) {
      return this.addToTop( cards );
    };
    deck.replace( 'd' );
    expect( deck.remaining( 4 ) );
    expect( deck.top( 4 ) ).to.deep.equal([ 'd', 'a', 'b', 'c' ]);
  });

});
