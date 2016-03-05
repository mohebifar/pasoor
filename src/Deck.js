import rand from 'rand-utils';
import Pile from './Pile';
import Card from './Card';

const piles = ['deck', 'discard', 'held'];

export default class Deck {
  constructor() {
    this.cards = new Pile();
    this.deck = new Pile();
    this.held = new Pile();
    this.discard = new Pile();
  }

  /**
   * Add a card to the deck
   *
   * @access  public
   * @param   card    the card object
   * @param   config
   * @return  void
   */
  add(card, config) {
    if (card.deck) {
      card.deck.remove(card);
    }

    card.deck = this;

    const pile = (config && config.pile) ? config.pile : 'deck';
    if (piles.indexOf(pile) < 0) {
      throw new Error(`Cannot add card to non-existent pile "${pile}"`);
    }

    this.cards.push(card);
    this[pile].push(card);
  }

  /**
   * Remove a card from the deck
   *
   * @access  public
   * @param   card
   * @return  void
   */
  remove(card) {
    Deck._remove(this.cards, card);
    piles.forEach(pile => {
      Deck._remove(this[pile], card);
    });

    card.deck = null;
  }

  static _remove(pile, card) {
    const index = pile.indexOf(card);
    if (index >= 0) {
      pile.splice(index, 1);
    }
  }

  /**
   * Draw a card(s) from the deck
   *
   * @access  public
   * @param   count    the number of cards to draw
   * @param   into    the deck to draw into
   * @return  object
   */
  draw(count, into) {
    if (!this.deck.length) {
      throw new RangeError('Cannot draw card from deck; No cards remaining.');
    }

    if (!count) {
      return this.deck.shiftInto(into || this.held);
    }

    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(this.draw(0, into || this.held));
    }

    return cards;
  }

  /**
   * Draw a card(s) from the deck and discard
   *
   * @access  public
   * @param   count
   * @return  object
   */
  drawToDiscard(count) {
    return this.draw(count, this.discard);
  }

  /**
   * Discard a card
   *
   * @access  public
   * @param   card
   * @return  void
   */
  discard(card) {
    if (Array.isArray(card) && typeof card[0] !== 'string') {
      card.forEach(this.discard.bind(this));
    }

    card = this.find(card);
    if (!card) {
      throw new Error('Given "card" value does not belong to this deck');
    }
    card.pile.splice(card.index, 1);
    this.discard.push(card.card);
  }


  /**
   * Find a card object and its location
   *
   * @access  public
   * @param   card
   * @return  object
   */
  find(card) {
    if (Array.isArray(card)) { // Allow card to be an array [suit, value]
      const cards = [];
      card[1] = String(card[1]);
      for (let i = 0, c = this.cards.length; i < c; i++) {
        if (this.cards[i].suit === card[0] && this.cards[i].value === card[1]) {
          cards.push(this.cards[i]);
        }
      }
      return cards.map(this.find.bind(this));
    }

    if (!card instanceof Card) {
      throw new Error('Cannot find non-card value');
    }

    let result = null;
    piles.forEach(pile => {
      if (!result) {
        const index = this[pile].indexOf(card);
        if (index >= 0) {
          result = [{
            index,
            pileName: pile,
            pile: self[pile],
            card,
          }];
        }
      }
    });

    return result;
  }

  /**
   * Shuffle all cards into the deck pile
   *
   * @access  public
   * @return  void
   */
  shuffleAll() {
    this.held.empty();
    this.discard.empty();
    this.deck.empty();
    this.cards.copyInto(this.deck);
    this.shuffleRemaining();
  }

  /**
   * Shuffle all cards remaining in the deck
   *
   * @access  public
   * @return  void
   */
  shuffleRemaining() {
    rand.shuffle(this.deck, exports.useArc4 ? 'ARC4' : 'SIMPLE');
  }

  /**
   * Shuffle the discard pile and append them to the deck
   *
   * @access  public
   * @return  void
   */
  shuffleDiscard() {
    rand.shuffle(this.discard, exports.useArc4 ? 'ARC4' : 'SIMPLE');
    this.discard.emptyInto(this.deck);
  }

  /**
   * Move all cards in the held pile to discard
   *
   * @access  public
   * @return  void
   */
  discardAllHeld() {
    this.held.emptyInto(this.discard);
  }
}
