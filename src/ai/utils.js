/*
 * full board format:
 * how `src/Game/Game.js` represents the game board; it's
 * more human friendly since it's 2D and includes the empty
 * spaces you can't actually move to
 *
 * condensed board format:
 * the format that's used as inputs to the neural net;
 * is flattened, and doesn't include empty cells that can't
 * be moved to; can be mapped back to a position on the full
 * board format by using the index of any given cell
 *
 *   00  01  02  03
 * 04  05  06  07
 *   08  09  10  11
 * 12  13  14  15
 *   16  17  18  19
 * 20  21  22  23
 *   24  25  26  27
 * 28  29  30  31
 *
 * (training) data board format:
 * the format that's used by the training dataset; pretty
 * much the same as the condensed board but with a
 * different numbering system for the board cells
 *
 *   32  31  30  29
 * 28  27  26  25
 *   24  23  22  21
 * 20  19  18  17
 *   16  15  14  13
 * 12  11  10  09
 *   08  07  06  05
 * 04  03  02  01
 */

const condensedNumMapArr = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23, 24, 26, 28, 30, 33, 35, 37, 39, 40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62]
const CONDENSED_TO_FULL_MAP = arrayToMap(condensedNumMapArr)
const FULL_TO_CONDENSED_MAP = arrayToIndexMap(condensedNumMapArr)
// initial null item since cells start at 1 instead of 0
const DATA_TO_FULL_MAP = arrayToMap([null].concat(condensedNumMapArr.reverse()))

// convert array to Map using number indexes as keys
function arrayToMap (arr) {
  const result = new Map()
  arr.forEach((value, index) => result.set(index, value))
  return result
}

// just like arrayToMap except the arr value is used as the key
// and the index is used as the value (used for mapping the maps
// to eachother)
function arrayToIndexMap (arr) {
  const result = new Map()
  arr.forEach((value, index) => result.set(value, index))
  return result
}

export function condenseBoard (board) {
  return board.map(row => {
    return row.filter(value => value !== null)
  })
}

export function getFullPosFromCondensedNum (num) {
  if (CONDENSED_TO_FULL_MAP.has(num)) {
    const fullNum = CONDENSED_TO_FULL_MAP.get(num)
    return [ Math.floor(fullNum / 8), fullNum % 8 ]
  }

  return null
}

export function getFullPosFromDataNum (num) {
  if (DATA_TO_FULL_MAP.has(num)) {
    const fullNum = DATA_TO_FULL_MAP.get(num)
    return [ Math.floor(fullNum / 8), fullNum % 8 ]
  }

  return null
}

export function getCondensedNumFromDataNum (num) {
  if (DATA_TO_FULL_MAP.has(num)) {
    const fullNum = DATA_TO_FULL_MAP.get(num)

    if (FULL_TO_CONDENSED_MAP.has(fullNum)) {
      return FULL_TO_CONDENSED_MAP.get(fullNum)
    }
  }

  return null
}
