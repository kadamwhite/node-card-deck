# Deck

[![Build Status](https://travis-ci.org/kadamwhite/node-card-deck.svg?branch=master)](https://travis-ci.org/kadamwhite/node-card-deck)

`Deck` is a basic JavaScript implementation of a deck of cards. An interface is provided to shuffle, pick, draw, re-insert and observe cards within the deck in a variety of ways. `Deck` makes no assumptions about the type of objects that will be contained within a deck: it can be used equally well with a string representation of traditional playing cards (say, `'h4'` for the 4 of hearts) as it could with a complex object instantiating a custom constructor (*e.g.* a `MagicCard` object).

[There are many implementations of this behavior on npm](https://www.npmjs.com/search?q=deck); I created another as an experiment for myself, not out of any fault in the existing options.

## Installation

Install with NPM: `npm install card-deck`

## Creating & Using a Deck

### Configure the deck

To create a deck object, instantiate it from the `Deck` constructor:
```js
var myDeck = new Deck();
```

To set the cards that this deck will contain, either provide an array argument when calling the `Deck` constructor,
```js
var myDeck = new Deck([ card1, card2, card3/*, ... */ ]);
```

or else call the `.cards` method to explicitly specify the cards this deck instance will contain:
```js
var myOtherDeck = new Deck();
myOtherDeck.cards([ card1, card2, card3/*, ... */ ]);
```

The cards will be initially inserted in the same order in which they occur in the provided array. To randomize the order of the cards, call `.shuffle`:
```js
myDeck.shuffle();
```
This will shuffle the cards using the [Fisher-Yates Shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm. For more background on this technique, see [Mike Bostock's visual comparison of shuffle algorithms](http://bost.ocks.org/mike/shuffle/).

### Inspect the Deck

To observe cards within the deck without removing them from the deck, use the `.top`, `.bottom` and `.random` methods:
```js
// Return the card at the top of the deck
var topCard = myDeck.top();

// Return the bottom two cards in the deck
var bottomCards = myDeck.bottom(2);

// Return six random cards anywhere in the deck
var randomCards = myDeck.random(6);
```

Retrieve the count of cards currently contained within the deck by using the `.remaining` method:
```js
var cardCount = myDeck.remaining(); // 42
```

### Draw Cards from the Deck

Remove cards from the deck (and return them as an object or array) using any of the draw methods:
```js
// Draw a single card
var drawnCard = deck.draw();

// Draw 5 cards
var hand = deck.draw(5);

// Draw a card from the bottom of the deck
var bottomCard = deck.drawFromBottom();

// Draw 3 cards where the card object's `.suit` is "hearts"
var threeHearts = deck.drawWhere(function(card) {
  return card.suit === 'hearts';
}, 3);

// Draw 2 random cards from anywhere in the deck
var randomCards = deck.drawRandom(2);
```

### Add Cards to the Deck

Return cards to the deck using the following discard methods:
```js
// Place a card on the top of the deck
myDeck.addToTop({ suit: 'spades', rank: 'Jack' });

// Return two cards to the bottom of the deck
myDeck.addToBottom([card1, card2]);

// Return three cards to the bottom of the deck in random order
myDeck.shuffleToBottom([card1, card2, card3]);

// Return two cards to the top of the deck in random order
myDeck.shuffleToTop([card1, card2]);

// Insert an array of cards at random positions throughout the deck
myDeck.addRandom([card1, card2, card3]);
```

The verbiage here is intentionally general. You can create your own aliases for these functions by augmenting the `Deck` prototype:

```js
myDeck.prototype.replace = function( cards ) {
  return this.placeOnTop( cards );
}
```

## Development & Contributing

`Deck` is intentionally minimal, but if you have a suggestion for a new feature or (most importantly!) a bug report about something that isn't working right, please open an issue so that we can address the problem quickly.

If you are interested in altering or adding code to `Deck`, here is how to work with the repository locally:

1. Ensure you have [Node.js](https://nodejs.org/en/) installed on your system: on OSX, we recommend using [Homebrew](http://brew.sh/) to install Node.
2. [Clone this project](https://help.github.com/articles/cloning-a-repository/) to your computer
3. On the command line, within the directory to which you cloned this project, run `npm install` to install the development dependencies. `Deck` has no run-time dependencies.

All `Deck` code is [unit tested](deck.spec.js). Execute
```
npm test
```
to run the tests and view a code coverage summary. More detailed code coverage information will now be available in the `coverage/` directory.

To run the unit tests as a watcher, so that they will re-run when code changes, execute the command
```
npm run test:watch
```

In a similar manner, to run the tests through code syntax & style validation with JSHint and JSCS, use the command
```
npm run lint
```
to run once and
```
npm run lint:watch
```
to run many times.
