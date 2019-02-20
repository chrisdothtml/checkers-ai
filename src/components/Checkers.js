import cn from 'classnames'
import React from 'react'
import Game, { BLACK_VALUES, KING_VALUES, RED_VALUES } from '../../lib/Game/Game.js'
import './Checkers.css'

function Piece (props) {
  const { value } = props
  const className = cn([
    'piece',
    {
      black: BLACK_VALUES.has(value),
      king: KING_VALUES.has(value),
      red: RED_VALUES.has(value)
    }
  ])

  return <div className={ className } />
}

function Cell (props) {
  const { onSelectCell, selected, value, x, y } = props
  const className = cn([
    'cell',
    value === -1 ? 'light' : 'dark',
    { selected }
  ])

  return (
    <div
      className={ className }
      onClick={ () => onSelectCell(x, y) }
    >
      { value > 0 && <Piece value={ value } /> }
    </div>
  )
}

export default class Checkers extends React.Component {
  constructor (props) {
    super(props)
    this.game = new Game()
    this.state = {
      board: this.game.board,
      selectedCell: []
    }
  }

  cellIsSelected (x, y) {
    const { selectedCell } = this.state
    return selectedCell[0] === y && selectedCell[1] === x
  }

  onSelectCell (x, y) {
    const { selectedCell } = this.state

    if (selectedCell.length) {
      if (this.cellIsSelected(x, y)) {
        this.setState({
          selectedCell: []
        })
      } else {
        const origin = selectedCell
        const dest = [y, x]

        try {
          this.game.move(origin, dest)
        } catch (e) { /* noop */ }

        this.setState({
          board: this.game.board,
          selectedCell: []
        })
      }
    } else {
      this.setState({
        selectedCell: [y, x]
      })
    }
  }

  render () {
    return (
      <div className='board'>
        { this.state.board.map((row, y) => {
          return (
            <div className='row' key={ y }>
              { row.map((value, x) => (
                <Cell
                  key={ x }
                  onSelectCell={ this.onSelectCell.bind(this) }
                  selected={ this.cellIsSelected(x, y) }
                  value={ value }
                  x={ x }
                  y={ y }
                />
              )) }
            </div>
          )
        }) }
      </div>
    )
  }
}
