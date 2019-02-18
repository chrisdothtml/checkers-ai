import React from 'react'
import './Piece.css'

function getClassname (value) {
  switch (value) {
    case 1:
      return 'black'
    case 2:
      return 'black king'
    case 3:
      return 'red'
    case 4:
      return 'red king'
  }
}

export default function Piece (props) {
  const className = `piece ${getClassname(props.value)}`
  return <div className={ className } />
}
