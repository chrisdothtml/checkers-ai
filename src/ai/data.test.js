import test from 'ava'
import { parseGameMoves } from './data.js'

test('parseGameMoves', (t) => {
  const testGame = `
[foo "bar"]
[Result "0-1"]
1. 11-15 26x17x10x1
2. 18x27 0-1

`

  t.deepEqual(parseGameMoves(testGame), [
    [[11, 15]],
    [
      [26, 17],
      [17, 10],
      [10, 1]
    ],
    [[18, 27]]
  ])
})
