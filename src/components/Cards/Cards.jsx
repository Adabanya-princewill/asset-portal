import React from 'react'
import './Cards.css'
import { FiInfo } from "react-icons/fi";

const Cards = ({ title, number }) => {
  const iconSize = 20;

  return (
    <div className='dash-div'>
      <div className='top-card'>
        <span className='card-title'>{title}</span>
        <FiInfo size={iconSize} color='#A1A1A1' />
      </div>
      <span className='figure'>{number}</span>
    </div>
  )
}

export default Cards
