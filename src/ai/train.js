import Game from '../Game/Game.js'
import Brain from './brain.js'
import { getTrainingData } from './data.js'
import {
  condenseBoard,
  getCondensedNumFromDataNum,
  getFullPosFromDataNum
} from './utils.js'

const brain = new Brain()

function isBrainMove (game, move) {
  const value = game.utils.getPos(
    getFullPosFromDataNum(move[0])
  )

  // brain is the top player
  return value < 0
}

async function main () {
  const trainingGames = await getTrainingData()

  for (const trainingGame of trainingGames) {
    const game = new Game()

    for (const moveGroup of trainingGame) {
      for (const move of moveGroup) {
        // only teach one player's moves
        if (isBrainMove(game, move)) {
          brain.teach(
            condenseBoard(game.board),
            move.map(getCondensedNumFromDataNum)
          )
        }

        game.move(
          ...move.map(getFullPosFromDataNum)
        )
      }
    }
  }
}

main().catch(console.error)
