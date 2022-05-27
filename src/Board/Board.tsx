import React, { useState, useEffect } from "react"
import Box from "../Box"
import { Option, Game } from "../Common/types"

const Board = (): JSX.Element => {
  const [user, setUser] = useState<Option>(Option.Cross)
  const [winner, setWinner] = useState<Option | null>(null)
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
    changeUser()
  }

  const isDraw = (): boolean => {
    return clicks === 9 && winner === null
  }

  const updateGame = (gameIndex: keyof Game, value: Option) => {
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
      game[boxIndex1] === Option.Naught &&
      game[boxIndex2] === Option.Naught &&
      game[boxIndex3] === Option.Naught
    ) {
      setWinner(Option.Naught)
    } else if (
      game[boxIndex1] === Option.Cross &&
      game[boxIndex2] === Option.Cross &&
      game[boxIndex3] === Option.Cross
    ) {
      setWinner(Option.Cross)
    }
  }

  const changeUser = () => {
    setUser(user === Option.Naught ? Option.Cross : Option.Naught)
  }

  const resetGame = () => {
    setUser(Option.Cross)
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
              disabled={isDraw() || winner !== null}
            />
          )
        })}
      </div>
      {winner === Option.Cross && (
        <>
          <h2>Cross Wins! 🎉</h2>
          <button type="button" className="playAgainBtn" onClick={resetGame}>
            Play Again!
          </button>
        </>
      )}
      {winner === Option.Naught && (
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
