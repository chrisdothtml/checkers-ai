import cn from 'classnames'
import React from 'react'
import { BLACK_VALUES, KING_VALUES, RED_VALUES } from '../../lib/Game/Game.js'
import './Piece.css'

export default function Piece (props) {
  const { value } = props
  const className = cn([
    'piece',
    {
      black: BLACK_VALUES.includes(value),
      king: KING_VALUES.includes(value),
      red: RED_VALUES.includes(value)
    }
  ])

  return <div className={ className } />
}
