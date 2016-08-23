const test = require('tape');
const isPlainObject = require('lodash.isplainobject');
const isArray = require('lodash.isarray');
const isFunction = require('lodash.isfunction');

const pasoor = require('../lib');

test('exports an object of functions', (t) => {
  t.plan(4);
  t.ok(isPlainObject(pasoor));
  t.ok(isFunction(pasoor.Card));
  t.ok(isFunction(pasoor.Deck));
  t.ok(isFunction(pasoor.Pile));
});

test('creates an empty deck', (t) => {
  t.plan(9);
  const deck = new pasoor.Deck();
  t.ok(deck instanceof pasoor.Deck);
  ['cards', 'deck', 'discard', 'held'].forEach((prop) => {
    t.ok(isArray(deck[prop]));
    t.equal(deck[prop].length, 0);
  });
});

test('throws error when drawing from empty deck', (t) => {
  t.plan(1);
  const deck = new pasoor.Deck();
  t.throws(deck.draw);
});

test('creates an deck from preset', (t) => {
  t.plan(9);
  const deck = pasoor.Deck.create(pasoor.presets.shelem);
  t.ok(deck instanceof pasoor.Deck);
  ['cards', 'deck'].forEach((prop) => {
    t.ok(isArray(deck[prop]));
    t.equal(deck[prop].length, 52);
  });
  ['discard', 'held'].forEach((prop) => {
    t.ok(isArray(deck[prop]));
    t.equal(deck[prop].length, 0);
  });
});

test('shuffles deck', (t) => {
  t.plan(1);
  const deck = pasoor.Deck.create(pasoor.presets.shelem);
  const oldDeck = deck.deck.shift();
  deck.shuffleAll();
  t.notDeepEqual(deck.cards, oldDeck);
});
