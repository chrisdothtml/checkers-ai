import React from 'react'
import Game from '../../lib/Game/Game.js'
import Cell from './Cell.js'
import './Checkers.css'

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
          const className = `row ${y % 2 === 0 ? 'even-row' : 'odd-row'}`

          return (
            <div className={ className } key={ y }>
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
