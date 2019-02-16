import test from 'ava'
import Game from './Game.js'

test('move', (t) => {
  const game = new Game()

  game.move([2, 1], [3, 2])
  t.is(game.board[2][1], 0)
  t.is(game.board[3][2], 1)
  game.move([5, 0], [4, 1])
  t.is(game.board[5][0], 0)
  t.is(game.board[4][1], 3)
  game.move([3, 2], [5, 0])
  t.is(game.board[3][2], 0)
  t.is(game.board[4][1], 0)
  t.is(game.board[5][0], 1)
  // move out of the way
  game.move([5, 2], [4, 3])
  game.move([6, 1], [5, 2])
  game.move([7, 2], [6, 1])
  // get king'd
  game.move([5, 0], [7, 2])
  t.is(game.board[6][1], 0)
  t.is(game.board[7][2], 2)
})
