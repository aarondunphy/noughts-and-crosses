import React, { useState, useEffect } from "react"
import Box from "./Box"

interface Game {
  box1: string | null
  box2: string | null
  box3: string | null
  box4: string | null
  box5: string | null
  box6: string | null
  box7: string | null
  box8: string | null
  box9: string | null
}

const Board = (): JSX.Element => {
  const [user, setUser] = useState<string>("cross")
  const [winner, setWinner] = useState<string>("")
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
    if (game[gameIndex] !== null || winner !== "") {
      return
    }
    setClicks(clicks + 1)
    updateGame(gameIndex, user)
    changeUser()
  }

  const isDraw = (): boolean => {
    return clicks === 9 && winner === null
  }

  const updateGame = (gameIndex: keyof Game, value: string) => {
    const gameCopy = { ...game }
    gameCopy[gameIndex] = value
    setGame(gameCopy)
  }

  useEffect(() => {
    checkForWin()
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
      game[boxIndex1] === "naught" &&
      game[boxIndex2] === "naught" &&
      game[boxIndex3] === "naught"
    ) {
      setWinner("naught")
    } else if (
      game[boxIndex1] === "cross" &&
      game[boxIndex2] === "cross" &&
      game[boxIndex3] === "cross"
    ) {
      setWinner("cross")
    }
  }

  const changeUser = () => {
    setUser(user === "naught" ? "cross" : "naught")
  }

  const resetGame = () => {
    setUser("cross")
    setWinner("")
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
              disabled={isDraw() || winner.length > 0}
            />
          )
        })}
      </div>
      {winner === "cross" && (
        <>
          <h2>Cross Wins! 🎉</h2>
          <button type="button" className="playAgainBtn" onClick={resetGame}>
            Play Again!
          </button>
        </>
      )}
      {winner === "naught" && (
        <>
          <h2>Naught Wins! 🎉</h2>
          <button type="button" className="playAgainBtn" onClick={resetGame}>
            Play Again!
          </button>
        </>
      )}
      {isDraw() && (
        <>
          <h2>Draw! 🤷‍♂️</h2>
          <button type="button" className="playAgainBtn" onClick={resetGame}>
            Play Again!
          </button>
        </>
      )}
    </div>
  )
}

export default Board
