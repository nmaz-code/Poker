const groupBy = (list, grouper) => {
    const groups = {}
    for (const element of list) {
        const group = grouper(element)
        if (!groups[group]) {
            groups[group] = []
        }
        groups[group].push(element)
    }
    return groups
}


const Ranks = Object.freeze([ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]);
const Suits = Object.freeze([ 'hearts', 'clubs', 'diams', 'spades' ]);

// Card Definition by Example
// const AceOfClubs = {
//   rank: 'A',
//   suit: 'clubs',
//   weight: 12,
// }
//
// Card functions
// Helper functions (Accessor or Helper functions)
const rank = ({ rank }) => rank;
const suit = ({ suit }) => suit;
const weight = ({ weight }) => weight;
const length = ({ length }) => length;

const RateableCards = (cards) => {
  const orderedCards = sortBy(cards, weight);
  const ranks = groupBy(orderedCards, rank);
  const suits = groupBy(orderedCards, suit);
  const rankTimes = groupBy(Object.values(ranks), length);
  const suitTimes = groupBy(Object.values(suits), length);
  
  return Object.freeze({
    hasAce: () => !!ranks['A'],
    hasOfSameRank: n => rankTimes[n]?.length || 0,
    hasOfSameSuit: n => suitTimes[n]?.length || 0,
    isASequenceOf: n => (
      orderedCards.length === n && orderedCards[n - 1].weight - orderedCards[0].weight === n - 1
    ),
  });
}

const rate = rating => cards => 
  Object.entries(rating)
    .find(([, is]) => is(cards))
    .shift();

// Poker definition
const PokerRating = {
  RoyalFlush: hand => hand.isASequenceOf(5) && hand.hasOfSameSuit(5) && hand.hasAce(),
  StraightFlush: hand => hand.isASequenceOf(5) && hand.hasOfSameSuit(5),
  FourOfAKind: hand => hand.hasOfSameRank(4),
  FullHouse: hand => hand.hasOfSameRank(3) && hand.hasOfSameRank(2),
  Flush: hand => hand.hasOfSameSuit(5),
  Straight: hand => hand.isASequenceOf(5),
  ThreeOfAKind: hand => hand.hasOfSameRank(3),
  TwoPair: hand => hand.hasOfSameRank(2) >= 2,
  OnePair: hand => hand.hasOfSameRank(2),
  HighCard: hand => hand.hasOfSameRank(1) >= 5,
};

//
// Tests
//
console.clear();

const [ H, C, D, S ] = Suits;

// a simplified card constructor for testing purposes 
const Crd = (weight, suit) => ({ rank: Ranks[weight], suit, weight });

const hands = [
  [ Crd(12, H), Crd(8, H), Crd(12, C), Crd(8, C), Crd(12, D) ], // Full House
  [ Crd(12, H), Crd(12, D), Crd(12, C), Crd(6, D), Crd(12, S) ], // Four of a kind
  [ Crd(12, H), Crd(8, H), Crd(11, H), Crd(10, H), Crd(9, H) ], // Royal Flush
  [ Crd(12, H), Crd(8, H), Crd(12, C), Crd(7, S), Crd(7, D) ], // Two Pairs
  [ Crd(12, H), Crd(8, H), Crd(7, C), Crd(3, C), Crd(5, S) ], // high card
];

const PokerHandRate = rate(PokerRating);

hands.forEach(hand =>
  console.log(PokerHandRate(RateableCards(hand)))
);
