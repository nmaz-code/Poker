import React from 'react'
import generateDeck from './Components/Deck'
import Rankings from './Components/Rankings'

export default function App() {

    const deck = React.useMemo(() => generateDeck(), [])
    const rankings = React.useMemo(() => Rankings(), [])
    const [hand, setHand] = React.useState([], [])
    const [ranking, setRanking] = React.useState(null,[])  
    
    function fixHand(){
        setRanking(null)
        //royal flush test hand
        const handIds = [50,37,4,25,0] 

        setHand(deck.filter(card => handIds.includes(card.id)))
    }

    function dealHand(){
        setRanking(null)
        const handIds = []
        for(let i=0; i<5; i++){
            while (handIds.length != 5){
                let id = null;
                id = Math.floor (Math.random() * deck.length)
                if (!handIds.includes(id))  {
                    handIds.push(id)
                    //console.log(id)
                    
                }
            }
        }
        //console.log(handIds)
        setHand(deck.filter(card => handIds.includes(card.id)))
        
    }
    
    

    function checkRanking(){
       setRanking(rankings[9])

        const sameSuitGroups = getGroups("suit");
        const noOfSuitGroups = sameSuitGroups.length;

        const sameRankGroups = getGroups("rank");
        const noOfRankGroups = sameRankGroups.length;

        //Royal Flush: A-K-Q-J-10, all of the same suit
       if (checkRoyalStraight() && noOfSuitGroups ===1 && sameRankGroups[0].length === 5) {
        setRanking(rankings[0])
        return
       }
       //Straight Flush: Five cards in a row, all of the same suit, e.g., 7-8-9-10-J of Hearts
        if (noOfSuitGroups === 1 && sameSuitGroups[0].length === 5 && getCardsInRow(hand).length === 5) {
            setRanking(rankings[1])
            return
        }
        //Four of a Kind: Four cards of the same rank, e.g., four Aces
       if (noOfRankGroups === 1 && sameRankGroups[0].length === 4) {
        setRanking(rankings[2])
        return
       }
       //Full House: (Three of a kind + one pair, e.g., three Kings and two 5s)
       if ((noOfRankGroups === 2 && sameSuitGroups[0].length === 3 && sameSuitGroups[1].length === 2) ||
       (noOfRankGroups === 2 && sameSuitGroups[0].length === 2 && sameSuitGroups[1].length ===3 )) {
        setRanking(rankings[3])
        return
       }
       //Flush: (Any five cards of the same suit, not in a row, e.g., A-K-8-5-2 of Spades)
       if (noOfSuitGroups === 1 && sameSuitGroups[0].length === 5 ) {
            setRanking(rankings[4])
            return
        }
        // Straight: (Five cards in a row, but different suits, e.g., 6-7-8-9-10)
        if ( getCardsInRow(hand).length === 5) {
            setRanking(rankings[5])
            return
        }
        //Three of a Kind: (Three cards of the same rank, e.g., three Jacks)
        if (noOfRankGroups >= 1 && sameRankGroups[0].length === 3) {
        setRanking(rankings[6])
        return
       }
       //Two Pair: (Two different pairs, e.g., two Aces and two 7s)
        if (noOfRankGroups === 2 && sameSuitGroups[0].length === 2 && sameSuitGroups[1].length === 2)  {
            setRanking(rankings[7])
            return
        }
        //One Pair: (Two cards of the same rank, e.g., two Queens)
        if (noOfRankGroups === 1 && sameSuitGroups[0].length === 2)  {
            setRanking(rankings[8])
            return
        }

    }

    
    function getGroups(groupByKey){
        if (!Array.isArray(hand) || hand.length === 0) return []
        const groups = {}
        for (const card of hand) {
            const key = card?.[groupByKey] ?? 'unknown'
            if (!groups[key]) groups[key] = []
            groups[key].push(card)
        }
        return Object.values(groups).filter(group => group.length >= 2)
    }
    

    function getCardsInRow(cards){
        
        let cardSequences = []
        let cardsInRow = []
       const sortedCards = cards.sort((a,b) => a.grade - b.grade)
       
       for(let i=1; i<5; i++){
              if (sortedCards[i].grade - sortedCards[i-1].grade === 1){
                if (sortedCards[i-1] && !cardsInRow.includes(sortedCards[i-1])){   
                cardsInRow.push(sortedCards[i-1])
              }
                cardsInRow.push(sortedCards[i]) 
                if (i==4) cardSequences.push(cardsInRow)
            } 
            else {
                if (cardsInRow.length >=2) {
                    cardSequences.push(cardsInRow)
                    cardsInRow = []
                }   
               
            }
       } 
       
      return cardsInRow
    }

    function checkRoyalStraight(){
        const ranksToCheck = ['10', 'J', 'Q', 'K', 'A'] 
        if (hand.filter(card => ranksToCheck.includes(card.rank)).length === 5)
            return true
        else return false
     }
    

  return (
    <div className="app">
      <h1>Hello Poker Face</h1>
      <p>Deck has: {deck.length} cards   </p>
    <button onClick = {dealHand}>Deal Hand</button>
    <button onClick = {fixHand}>Fix Hand</button>
    
    <ul>
        {hand.map(card => (
            <li key={card.id}>{card.rank} of {card.suit}</li>
        ))}
    </ul>
    <button onClick = {checkRanking}>Check Ranking</button>
        {ranking && (
    <p>
        <b>{ranking.rank}.{ranking.name}</b>
        <br/>
        {ranking.description} 
    </p>
        )}
   
    </div>
  )
}
