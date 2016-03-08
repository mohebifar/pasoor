import Deck from './Deck';
import Card from './Card';

export function pockerDeck() {
  const deck = new Deck();

  ['club', 'diamond', 'heart', 'spade'].forEach(suit => {
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'].forEach(value => {
      deck.add(new Card(suit, value));
    });
  });
}