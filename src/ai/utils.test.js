import test from 'ava'
import {
  condenseBoard,
  getFullPosFromCondensedNum,
  getFullPosFromDataNum
} from './utils.js'

test('condenseBoard', (t) => {
  const full = [
    [null, -1, null, -1, null, -1, null, -1],
    [-1, null, -1, null, -1, null, -1, null],
    [null, -1, null, -1, null, -1, null, -1]
  ]
  const condensed = [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1]
  ]

  t.deepEqual(condenseBoard(full), condensed)
})

test('getFullPosFromCondensedNum', (t) => {
  t.deepEqual(getFullPosFromCondensedNum(0), [0, 1])
  t.deepEqual(getFullPosFromCondensedNum(10), [2, 5])
  t.deepEqual(getFullPosFromCondensedNum(31), [7, 6])
})

test('getFullPosFromDataNum', (t) => {
  t.deepEqual(getFullPosFromDataNum(32), [0, 1])
  t.deepEqual(getFullPosFromDataNum(22), [2, 5])
  t.deepEqual(getFullPosFromDataNum(1), [7, 6])
})
