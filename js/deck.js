/**
 * @module deck
 */
'use strict';

var randomNumber = require( './lib/random-number' );

function isArray( arr ) {
  return Array.isArray( arr );
}

function randomIndex( arr ) {
  var length = isArray( arr ) ? arr.length : arr;
  return Math.floor( randomNumber() * length );
}

/**
 * Shuffle an array in place
 * @param {Array} arr A reference to the array to shuffle
 */
function shuffle( arr ) {
  // Fisher–Yates implementation adapted from http://bost.ocks.org/mike/shuffle/
  var remaining = arr.length;
  var tmp;
  var idx;

  // While there remain elements to shuffle…
  while ( remaining ) {
    // Pick a remaining element...
    idx = Math.floor( randomNumber() * remaining-- );

    // And swap it with the current element.
    tmp = arr[ remaining ];
    arr[ remaining ] = arr[ idx ];
    arr[ idx ] = tmp;
  }
}

/**
 * @class Deck
 */
function Deck( arr ) {
  this._stack = isArray( arr ) ? arr : [];
}

Deck.prototype.cards = function( cardArray ) {
  if ( ! isArray( cardArray ) ) { return this; }
  // Replace the deck with the new cards
  this._stack = cardArray;
  return this;
};
Deck.prototype.shuffle = function() {
  shuffle( this._stack );
  return this;
};
Deck.prototype.remaining = function() {
  return this._stack.length;
};
Deck.prototype.draw = function( count ) {
  count || ( count = 1 );
  var drawnCards = this._stack.splice( 0, count );
  return count === 1 ? drawnCards[ 0 ] : drawnCards;
};
Deck.prototype.drawFromBottom = function( count ) {
  count || ( count = 1 );
  var drawnCards = this._stack.splice( -count, count ).reverse();
  if ( count === 1 ) {
    return drawnCards[ 0 ];
  }
};
Deck.prototype.drawWhere = function( count, predicate ) {
  count || ( count = 1 );
};
Deck.prototype.drawRandom = function( count ) {
  count || ( count = 1 );
  if ( count === 1 ) {
    return this._stack.splice( randomIndex( this._stack ), 1 )[ 0 ];
  }
  var drawnCards = [];
  for ( var i = 0; i < count; i++ ) {
    drawnCards.push( this._stack.splice( randomIndex( this._stack ), 1 )[ 0 ] );
  }
  return drawnCards;
};
Deck.prototype.discardToBottom = function( cards ) {
  if ( ! isArray( cards ) ) {
    // Handle individual card objects
    return this.discardToBottom([ cards ]);
  }
  this._stack.push.apply( this._stack, cards );
};
Deck.prototype.shuffleToBottom = function( cards ) {
  if ( ! isArray( cards ) ) {
    // Handle individual card objects
    return this.shuffleToBottom([ cards ]);
  }
  shuffle( cards );
  return this.discardToBottom( cards );
};
Deck.prototype.discardToTop = function( cards ) {
  if ( ! isArray( cards ) ) {
    // Handle individual card objects
    return this.discardToTop([ cards ]);
  }
  this._stack.unshift.apply( this._stack, cards );
  return this;
};
Deck.prototype.shuffleToTop = function( cards ) {
  if ( ! isArray( cards ) ) {
    // Handle individual card objects
    return this.shuffleToTop([ cards ]);
  }
  shuffle( cards );
  return this.discardToTop( cards );
};
Deck.prototype.discardRandom = function( cards ) {
  if ( ! isArray( cards ) ) {
    // Handle individual card objects
    return this.discardRandom([ cards ]);
  }
};
Deck.prototype.top = function( count ) {
  if ( ! this._stack.length ) { return; }
  count || ( count = 1 );
  var returnedCards = this._stack.slice( 0, count );
  return count === 1 ? returnedCards[ 0 ] : returnedCards;
};
Deck.prototype.bottom = function( count ) {
  if ( ! this._stack.length ) { return; }
  count || ( count = 1 );
  var returnedCards =  this._stack.slice( -count ).reverse();
  return count === 1 ? returnedCards[ 0 ] : returnedCards;
};
Deck.prototype.random = function( count ) {
  if ( ! this._stack.length ) { return; }
  count || ( count = 1 );
  if ( count === 1 ) {
    return this._stack.slice( randomIndex( this._stack, 1 ) )[ 0 ];
  }
  var returnedCards = [];
  var usedIndices = [];
  var idx;
  for ( var i = 0; i < count; i++ ) {
    idx = randomIndex( this._stack );
    // Ensure index has not been used
    while ( usedIndices.indexOf( idx ) > -1 ) {
      idx = randomIndex( this._stack );
    }
    returnedCards.push( this._stack.slice( idx, idx + 1 )[ 0 ] );
  }
  return returnedCards;
};

module.exports = Deck;
