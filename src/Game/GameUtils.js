export default class GameUtils {
  constructor (game) {
    this.game = game
  }

  getPos ([ y, x ]) {
    if (y < 0 || x < 0 || y > 7 || x > 7) return null
    return this.game.board[y][x]
  }

  setPos ([ y, x ], value) {
    if (y < 0 || x < 0 || y > 7 || x > 7) return null
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
    if (value1 < 0) {
      return value2 < 0
    } else if (value1 > 0) {
      return value2 > 0
    }

    return false
  }

  isBackwardMove (origin, dest) {
    const originValue = this.getPos(origin)

    if (originValue < 0) {
      return origin[0] > dest[0]
    } else if (originValue > 0) {
      return origin[0] < dest[0]
    }

    return false
  }

  isDiagonalMove (...args) {
    return !!this.getDiagDistance(...args)
  }

  isMovable (value) {
    return value && Math.abs(value) < 3
  }

  isValidMove (...args) {
    const [ origin, dest ] = args
    const originValue = this.getPos(origin)
    const destValue = this.getPos(dest)

    if (this.isMovable(originValue) && destValue === 0) {
      // only kings move backwards
      if (!this.isBackwardMove(...args) || Math.abs(originValue) === 2) {
        switch (this.getDiagDistance(...args)) {
          case 1:
            return true
          case 2:
            const jumpedValue = this.getPos(this.getJumpedPos(...args))

            if (this.isMovable(jumpedValue)) {
              return !this.isAllies(originValue, jumpedValue)
            }
        }
      }
    }

    return false
  }
}
