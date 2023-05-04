import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import Card from './Card'
const DeckOfCard = ({ deck_count }) => {
  const BASE_URL = `https://deckofcardsapi.com/api/deck`
  const [deckId, setDeckId] = useState(null)
  const [cards, setCards] = useState([])
  const [url, setUrl] = useState(null)
  const [cardsRemaining, setCardsRemaining] = useState(0)

  useEffect(() => {
    axios.get(`${BASE_URL}/new/shuffle/?deck_count=${deck_count}`).then(res => {
      setDeckId(res.data.deck_id)
      setCardsRemaining(res.data.remaining)
    }).catch(err => {
      console.log(err)
      Error('Error: Failed to create new deck.')
    })
  }, [deck_count])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (deckId) {
      setUrl(`${BASE_URL}/${deckId}/draw/?count=1`)

    }
  }
  const addCard = (newCard) => {
    setCards(cards => [
      ...cards,
      {
        id: uuid(),
        image: newCard.image,
        value: newCard.value,
        suit: newCard.suit
      }
    ])
    setUrl(null)
    setCardsRemaining(cardsRemaining => cardsRemaining - 1)
  }
  useEffect(() => {
    if (url === null) {
      return
    } else {
      async function drawACard() {
        const res = await axios.get(url)
        const { image, value, suit } = res.data.cards[0]
        const newCard = { image, value, suit }
        addCard(newCard)
      }
      drawACard()
    }
  }, [url])


  return (
    <div>
      {cardsRemaining === 0 ? <div>No cards remaining</div> :
        <form>
          <button onClick={handleSubmit} disabled={deckId === null}>Gimme a card</button>
        </form>
      }
      <div>
        {cards.map(card =>
          <Card image={card.image}
            value={card.value}
            suit={card.suit}
            key={card.id}
            id={card.id} />)
        }
      </div>
    </div>

  )
}

export default DeckOfCard
