export const Suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
export const Ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export default class Card {
    constructor(id, suit, rank, grade) {
        this.id = id;
        this.suit = suit;
        this.rank = rank;
        this.grade = grade;
    }
    
    } 