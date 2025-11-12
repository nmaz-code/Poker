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

        const sameSuitGroups = getGroups("suit");
        const noOfSuitGroups = sameSuitGroups.length;

        const sameRankGroups = getGroups("rank");
        const noOfSameRankGroups = sameRankGroups.length;

    console.log("Same Suit Grouips:", sameSuitGroups);
    console.log("Same Rank Groups:", sameRankGroups);

       //Royal Flush
       if (checkRoyalStraight() && noOfSuitGroups ===1 && sameRankGroups[0].length === 5) {
        setRanking(rankings[0])
        return
       }
    //    //Straight Flush
    //    if (getSameSuit(hand).length ==5 && getCardsInRow(getSameSuit(hand)).length ==5){
    //         //console.log(getSameSuit(hand).length)
    //         setRanking(rankings[1])
    //         return
    //    }
    //     //Four of a Kind
    //    if (getSameRank(hand).length >= 4) {
    //     setRanking(rankings[2])
    //     return
    //    }
    //    //Full House: (Three of a kind + one pair, e.g., three Kings and two 5s)
       
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
