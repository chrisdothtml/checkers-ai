import fs from 'fs'
import path from 'path'
import download from 'download'
import ora from 'ora'

const DATA_DIR = path.resolve(__dirname, '../../.data')
const DATA_URI = `https://raw.githubusercontent.com/chrislarson1/checkers.ai/699dbf02db62a3760f57c7d62af63e5d7c431876/data/OCA_2.0.pdn`
const GAME_RESULT_VALUES = new Set(['0-1', '1-0', '1/2-1/2'])

function pathExists (input) {
  try {
    fs.accessSync(input)
    return true
  } catch (e) {
    return false
  }
}

/*
[Event "Manchester 1841"]
[Date "1841-??-??"]
[Black "Moorhead, W."]
[White "Wyllie, J."]
[Site "Manchester"]
[Result "0-1"]
1. 11-15 24-20 2. 8-11 28-24 3. 9-13 22-18 4. 15x22 25x18 5. 4-8 26-22 6. 10-14
18x9 7. 5x14 22-18 8. 1-5 18x9 9. 5x14 29-25 10. 11-15 24-19 11. 15x24 25-22 12.
24-28 22-18 13. 6-9 27-24 14. 8-11 24-19 15. 7-10 20-16 16. 11x20 18-15 17. 2-6
15-11 18. 12-16 19x12 19. 10-15 11-8 20. 15-18 21-17 21. 13x22 30-26 22. 18x27
26x17x10x1 0-1
*/
export function parseGameMoves (game) {
  const result = []
  const movesStr = game.split('\n')
    .filter(line => line && !line.startsWith('['))
    .join(' ')

  for (const turn of movesStr.split(/\d{1,2}\./).slice(1)) {
    for (const move of turn.trim().split(' ')) {
      if (GAME_RESULT_VALUES.has(move)) break

      const moveGroup = []

      if (move.includes('x')) {
        let lastPos

        for (const pos of move.split('x')) {
          if (lastPos) {
            moveGroup.push([lastPos, pos])
          }

          lastPos = pos
        }
      } else {
        moveGroup.push(move.split('-'))
      }

      result.push(
        moveGroup.map(move =>
          move.map(pos => parseInt(pos))
        )
      )
    }
  }

  return result
}

async function downloadData () {
  const games = (await download(DATA_URI))
    .toString()
    .split('\n\n')

  return games.reduce((result, game) => {
    if (game) result.push(parseGameMoves(game))
    return result
  }, [])
}

export async function getTrainingData () {
  const dataPath = path.join(DATA_DIR, 'data.json')

  if (pathExists(dataPath)) {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  } else {
    const spinner = ora()
    spinner.start('Getting training data')
    const data = await downloadData()

    fs.mkdirSync(DATA_DIR)
    fs.writeFileSync(dataPath, JSON.stringify(data))
    spinner.succeed()
    return data
  }
}
