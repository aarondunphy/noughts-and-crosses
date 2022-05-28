import React, { useState, useEffect } from "react"
import Box from "../Box"
import { User, Game, Winner } from "../Common/types"
import Outcome from "../Outcome"
import "./style.scss"

const Board = (): JSX.Element => {
  const [user, setUser] = useState<User>(User.CROSS)
  const [winner, setWinner] = useState<Winner | null>(null)
  const [clicks, setClicks] = useState<number>(0)
  const [game, setGame] = useState<Game>({
    box1: null,
    box2: null,
    box3: null,
    box4: null,
    box5: null,
    box6: null,
    box7: null,
    box8: null,
    box9: null,
  })

  const handleClick = (gameIndex: keyof Game) => {
    if (game[gameIndex] !== null || winner !== null) {
      return
    }
    setClicks(clicks + 1)
    updateGame(gameIndex, user)
    setUser(user === User.NAUGHT ? User.CROSS : User.NAUGHT)
  }

  const updateGame = (gameIndex: keyof Game, value: User) => {
    const gameCopy = { ...game }
    gameCopy[gameIndex] = value
    setGame(gameCopy)
  }

  useEffect(() => {
    checkForWin()
  }, [game])

  const checkForWin = () => {
    let winnerFound = false
    const winnerLines = [
      ["box1", "box2", "box3"],
      ["box1", "box4", "box7"],
      ["box1", "box5", "box9"],
      ["box2", "box5", "box8"],
      ["box4", "box5", "box6"],
      ["box7", "box8", "box9"],
      ["box3", "box6", "box9"],
      ["box3", "box5", "box7"],
    ]

    winnerLines.forEach((line) => {
      const lineMatches = line.reduce(
        (carry, box) => {
          switch (game[box as keyof Game]) {
            case User.CROSS: {
              carry.crossMatches = carry.crossMatches + 1
              break
            }
            case User.NAUGHT: {
              carry.naughtMatches = carry.naughtMatches + 1
              break
            }
          }
          return carry
        },
        {
          naughtMatches: 0,
          crossMatches: 0,
        }
      )
      if (lineMatches.crossMatches === 3 || lineMatches.naughtMatches === 3) {
        winnerFound = true
        setWinner(lineMatches.crossMatches === 3 ? Winner.CROSS : Winner.NAUGHT)
      }
    })

    // max clicks and no winner = draw
    if (clicks === 9 && winnerFound === false) {
      setWinner(Winner.DRAW)
    }
  }

  const resetGame = () => {
    setUser(User.CROSS)
    setWinner(null)
    setClicks(0)
    setGame({
      box1: null,
      box2: null,
      box3: null,
      box4: null,
      box5: null,
      box6: null,
      box7: null,
      box8: null,
      box9: null,
    })
  }

  return (
    <div className="board-container">
      <div className="board">
        {Object.keys(game).map((box: string, index) => {
          return (
            <Box
              key={index}
              type={game[box as keyof Game]}
              handleClick={() => handleClick(box as keyof Game)}
              disabled={winner === Winner.DRAW || winner !== null}
            />
          )
        })}
      </div>

      <Outcome winner={winner} resetGame={resetGame} />
    </div>
  )
}

export default Board
