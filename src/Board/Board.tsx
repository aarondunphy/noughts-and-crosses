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

    // max clicks and no winner = draw
    if (clicks === 9 && winner === null) {
      setWinner(Winner.DRAW)
    }
  }, [game])

  const checkForWin = () => {
    checkLine("box1", "box2", "box3")
    checkLine("box1", "box4", "box7")
    checkLine("box1", "box5", "box9")
    checkLine("box2", "box5", "box8")
    checkLine("box4", "box5", "box6")
    checkLine("box7", "box8", "box9")
    checkLine("box3", "box6", "box9")
    checkLine("box3", "box5", "box7")
  }

  const checkLine = (
    boxIndex1: keyof Game,
    boxIndex2: keyof Game,
    boxIndex3: keyof Game
  ) => {
    if (
      game[boxIndex1] === User.NAUGHT &&
      game[boxIndex2] === User.NAUGHT &&
      game[boxIndex3] === User.NAUGHT
    ) {
      setWinner(Winner.NAUGHT)
    } else if (
      game[boxIndex1] === User.CROSS &&
      game[boxIndex2] === User.CROSS &&
      game[boxIndex3] === User.CROSS
    ) {
      setWinner(Winner.CROSS)
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
