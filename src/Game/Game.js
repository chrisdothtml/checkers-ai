import GameUtils from './GameUtils.js'

/*
null: empty; can't move to
-2: top king
-1: top
0: empty
1: bottom
2: bottom king
*/
export const INITIAL_BOARD = [
  [null, -1, null, -1, null, -1, null, -1],
  [-1, null, -1, null, -1, null, -1, null],
  [null, -1, null, -1, null, -1, null, -1],
  [0, null, 0, null, 0, null, 0, null],
  [null, 0, null, 0, null, 0, null, 0],
  [1, null, 1, null, 1, null, 1, null],
  [null, 1, null, 1, null, 1, null, 1],
  [1, null, 1, null, 1, null, 1, null]
]

export default class Checkers {
  constructor (initialBoard = INITIAL_BOARD) {
    this.board = [ ...initialBoard ]
    this.utils = new GameUtils(this)
  }

  move (origin, dest) {
    if (this.utils.isValidMove(origin, dest)) {
      const originVal = this.utils.getPos(origin)
      let setVal = originVal

      if ((originVal === -1 && dest[0] === 7) || (originVal === 1 && dest[0] === 0)) {
        // king me
        setVal *= 2
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
