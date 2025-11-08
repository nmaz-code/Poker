import Card, { Suits, Ranks } from './Card'

export default function generateDeck() {
    const deck = []
    for (const suite of Suits) {
        let grade = 1
        for (const rank of Ranks){    
            deck.push(new Card (deck.length, suite, rank, grade))
            grade += 1
        }
    }
    console.log(deck)
    return deck
}