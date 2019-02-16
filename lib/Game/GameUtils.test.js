import test from 'ava'
import Game, { INITIAL_BOARD } from './Game.js'

test('getDiagDistance', (t) => {
  const game = new Game()

  t.is(game.utils.getDiagDistance([0, 0], [1, 1]), 1)
  t.is(game.utils.getDiagDistance([1, 1], [0, 0]), 1)
  t.is(game.utils.getDiagDistance([2, 2], [0, 0]), 2)
  t.is(game.utils.getDiagDistance([3, 3], [1, 1]), 2)
  t.is(game.utils.getDiagDistance([5, 0], [3, 2]), 2)
  t.is(game.utils.getDiagDistance([0, 1], [1, 1]), null)
})

test('getJumpedPos', (t) => {
  const game = new Game()

  t.deepEqual(game.utils.getJumpedPos([0, 0], [2, 2]), [1, 1])
  t.deepEqual(game.utils.getJumpedPos([3, 3], [5, 5]), [4, 4])
  t.deepEqual(game.utils.getJumpedPos([5, 0], [3, 2]), [4, 1])
})

test('isBackwardMove', (t) => {
  const game = new Game()

  t.is(game.utils.isBackwardMove([1, 0], [0, 1]), true)
  t.is(game.utils.isBackwardMove([0, 1], [1, 0]), false)
  t.is(game.utils.isBackwardMove([5, 0], [6, 1]), true)
  t.is(game.utils.isBackwardMove([6, 1], [5, 0]), false)
})

test('isDiagonalMove', (t) => {
  const game = new Game()

  t.is(game.utils.isDiagonalMove([0, 0], [1, 1]), true)
  t.is(game.utils.isDiagonalMove([1, 1], [0, 0]), true)
  t.is(game.utils.isDiagonalMove([0, 1], [1, 1]), false)
  t.is(game.utils.isDiagonalMove([1, 1], [0, 1]), false)
})

test('isValidMove', (t) => {
  const game = new Game()

  t.is(game.utils.isValidMove([0, 0], [1, 1]), false)
  t.is(game.utils.isValidMove([0, 1], [1, 0]), false)
  t.is(game.utils.isValidMove([2, 1], [3, 2]), true)
  t.is(game.utils.isValidMove([5, 0], [4, 1]), true)

  // jump
  game.board[4][1] = 1
  t.is(game.utils.isValidMove([5, 0], [3, 2]), true)
  game.board[4][1] = INITIAL_BOARD[4][1]

  // backwards moves
  game.board[5][0] = 4
  game.board[6][1] = 0
  t.is(game.utils.isValidMove([5, 0], [6, 1]), true)
  t.is(game.utils.isValidMove([5, 2], [6, 1]), false)
  game.board[5][0] = INITIAL_BOARD[5][0]
  game.board[6][1] = INITIAL_BOARD[6][1]
})
