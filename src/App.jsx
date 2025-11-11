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
        const handIds = [0,13,26,39,17] //10-J-Q-K-A of Hearts

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

        const sameSuit1 = getSameSuit(hand);
        const sameSuit2 = getSameSuit (hand.filter(card => !sameSuit1.includes(card)));
        const sameRank1 = getSameRank(hand);
        const sameRank2 = getSameRank (hand.filter(card => !sameRank1.includes(card))  );
    console.log("Same Suit 1:", sameSuit1);
    console.log("Same Suit 2:", sameSuit2);
    console.log("Same Rank 1:", sameRank1);
    console.log("Same Rank 2:", sameRank2);

       //Royal Flush
       if (checkRoyalStraight() && getSameSuit(hand).length === 5) {
        setRanking(rankings[0])
        return
       }
       //Straight Flush
       if (getSameSuit(hand).length ==5 && getCardsInRow(getSameSuit(hand)).length ==5){
            //console.log(getSameSuit(hand).length)
            setRanking(rankings[1])
            return
       }
        //Four of a Kind
       if (getSameRank(hand).length >= 4) {
        setRanking(rankings[2])
        return
       }
       //Full House: (Three of a kind + one pair, e.g., three Kings and two 5s)
       
    }

    function getSameSuit(cards){
        const sameSuit = []
        let start = 0;
        for(let i=start+1; i<cards.length; i++){
            if (cards[i].suit === cards[start].suit) 
                sameSuit.push(cards[i])
            else start = i;
        }
        if (sameSuit.length >= 2)
            return sameSuit 
        else return []
    }

    function getSameRank(cards){
        let sameRank = []
        for(let i=0; i<cards.length; i++){
            if (cards[i].rank === cards[0].rank) sameRank.push(cards[i])
        }
        return sameRank
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
