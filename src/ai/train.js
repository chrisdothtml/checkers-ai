import Game from '../Game/Game.js'
import { getTrainingData } from './data.js'
import { getFullPosFromDataNum } from './utils.js'

// temporary; just validating all the moving parts.
// grabs the first training game and plays it through a Game
// instance, then logs the final game board
async function main () {
  const game = new Game()
  const trainingGames = await getTrainingData()

  for (const moveGroup of trainingGames[0]) {
    for (const move of moveGroup) {
      game.move(
        ...move.map(getFullPosFromDataNum)
      )
    }
  }

  console.log(game.board)
}

main().catch(console.error)
