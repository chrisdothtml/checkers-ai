import GameUtils from './GameUtils.js'

export const TOP_VALUES = new Set([1, 2])
export const KING_VALUES = new Set([2, 4])
export const MOVABLE_VALUES = new Set([1, 2, 3, 4])
export const BOTTOM_VALUES = new Set([3, 4])
/*
-1: empty; can't move to
0: empty
1: top
2: top king
3: bottom
4: bottom king
*/
export const INITIAL_BOARD = [
  [-1, 1, -1, 1, -1, 1, -1, 1],
  [1, -1, 1, -1, 1, -1, 1, -1],
  [-1, 1, -1, 1, -1, 1, -1, 1],
  [0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [3, -1, 3, -1, 3, -1, 3, -1],
  [-1, 3, -1, 3, -1, 3, -1, 3],
  [3, -1, 3, -1, 3, -1, 3, -1]
]

export default class Checkers {
  constructor () {
    this.board = [ ...INITIAL_BOARD ]
    this.utils = new GameUtils(this)
  }

  move (origin, dest) {
    if (this.utils.isValidMove(origin, dest)) {
      const originVal = this.utils.getPos(origin)
      let setVal = originVal

      // king me
      if (originVal === 1 && dest[0] === (this.board.length - 1)) {
        setVal = 2
      } else if (originVal === 3 && dest[0] === 0) {
        setVal = 4
      }

      if (this.utils.getDiagDistance(origin, dest) === 2) {
        this.utils.setPos(
          this.utils.getJumpedPos(origin, dest),
          0
        )
      }

      this.utils.setPos(origin, 0)
      this.utils.setPos(dest, setVal)
    } else {
      throw new Error('invalid move')
    }
  }
}
