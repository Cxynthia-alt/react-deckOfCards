import React from 'react';



const Card = ({ image, value, suit }) => {
  const cardInfo = `${value} of ${suit}`
  return (
    <div>
      <img src={image} alt={cardInfo} />
    </div>
  )
}

export default Card
