import Ranking from "./Ranking"

export default function Rankings(){
    const rankings = []
    rankings.push(new Ranking(1, "Royal Flush", "A-K-Q-J-10, all of the same suit"))     
    rankings.push(new Ranking(2, "Straight Flush","Five cards in a row, all of the same suit, e.g., 7-8-9-10-J of Hearts"))     
    rankings.push(new Ranking(3, "Four of a Kind", "Four cards of the same rank, e.g., four Aces"))     
    rankings.push(new Ranking(4, "Full House", "Three of a kind + one pair, e.g., three Kings and two 5s"))     
    rankings.push(new Ranking(5, "Flush", "Any five cards of the same suit, not in a row, e.g., A-K-8-5-2 of Spades"))     
    rankings.push(new Ranking(6, "Straight", "Five cards in a row, but different suits, e.g., 6-7-8-9-10"))     
    rankings.push(new Ranking(7, "Three of a Kind", "Three cards of the same rank, e.g., three Jacks"))     
    rankings.push(new Ranking(8, "Two different pairs, e.g., two Aces and two 7s"))     
    rankings.push(new Ranking(9, "One Pair", "Two cards of the same rank, e.g., two Queens"))     
    rankings.push(new Ranking(10, "High Card", "If no one has any of the above, the player with the single highest card wins, e.g., Ace-high"))     
   
    return rankings
}