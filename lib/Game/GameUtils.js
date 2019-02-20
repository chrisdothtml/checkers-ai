import {
  BLACK_VALUES,
  KING_VALUES,
  MOVABLE_VALUES,
  RED_VALUES
} from './Game.js'

export default class GameUtils {
  constructor (game) {
    this.game = game
  }

  getPos ([ y, x ]) {
    return this.game.board[y][x]
  }

  setPos ([ y, x ], value) {
    this.game.board[y][x] = value
    return value
  }

  getDiagDistance (...args) {
    const [ origin, dest ] = args
    const yDistance = Math.abs(origin[0] - dest[0])
    const xDistance = Math.abs(origin[1] - dest[1])

    return yDistance === xDistance ? yDistance : null
  }

  getJumpedPos (origin, dest) {
    return [
      ((origin[0] + dest[0]) / 2),
      ((origin[1] + dest[1]) / 2)
    ]
  }

  isAllies (value1, value2) {
    if (BLACK_VALUES.includes(value1)) {
      return BLACK_VALUES.includes(value2)
    } else if (RED_VALUES.includes(value1)) {
      return RED_VALUES.includes(value2)
    }

    return false
  }

  isBackwardMove (origin, dest) {
    const originValue = this.getPos(origin)

    if (BLACK_VALUES.includes(originValue)) {
      return origin[0] > dest[0]
    } else if (RED_VALUES.includes(originValue)) {
      return origin[0] < dest[0]
    }

    return false
  }

  isDiagonalMove (...args) {
    return !!this.getDiagDistance(...args)
  }

  isValidMove (...args) {
    const [ origin, dest ] = args
    const originValue = this.getPos(origin)
    const destValue = this.getPos(dest)

    // movable piece moving to empty space
    if (MOVABLE_VALUES.includes(originValue) && destValue === 0) {
      // only kings move backwards
      if (!this.isBackwardMove(...args) || KING_VALUES.includes(originValue)) {
        switch (this.getDiagDistance(...args)) {
          case 1:
            return true
          case 2:
            const jumpedValue = this.getPos(this.getJumpedPos(...args))

            if (MOVABLE_VALUES.includes(jumpedValue)) {
              return !this.isAllies(originValue, jumpedValue)
            }
        }
      }
    }

    return false
  }
}
