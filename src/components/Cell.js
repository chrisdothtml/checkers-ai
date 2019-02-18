import React from 'react'
import Piece from './Piece.js'
import './Cell.css'

export default function Cell (props) {
  const { onSelectCell, selected, value, x, y } = props
  const className = `cell${selected ? ' selected' : ''}`

  return (
    <div
      className={ className }
      onClick={ () => onSelectCell(x, y) }
    >
      { value > 0 && <Piece value={ value } /> }
    </div>
  )
}
