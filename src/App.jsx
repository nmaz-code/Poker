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
        const handIds = [8,9,10,11,12] //10-J-Q-K-A of Hearts

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
       setRanking(rankings[10])
       //Royal Flush
       if (checkRoyalStraight() && getSameSuit(hand).length === 5) {
        setRanking(rankings[0])
        return
       }
       //Straight Flush
       getCardsInRow(hand)
    }

    function getSameSuit(cards){
        let sameSuit = []
        for(let i=0; i<5; i++){
            if (hand[i].suit === hand[0].suit) sameSuit.push(hand[i])
        }
        return sameSuit
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
       
      console.log(cardSequences)
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
