export default class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = String(value);
    this.deck = null;
  }

  static suitUnicodeStrings = {
    heart: '♥',
    diamond: '♦',
    club: '♣',
    spade: '♠',
    sword: '☨',
    coin: '⚪',
    cup: '☕',
  };

  toJSON() {
    const { suit, value } = this;
    return {
      suit,
      value,
    };
  }

  toUnicodeString() {
    const { value } = this;
    const suit = Card.suitUnicodeStrings[this.suit] || this.suit;
    return `${value}${suit}`;
  }
}
