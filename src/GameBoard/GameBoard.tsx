import React, { useState, useEffect } from "react"
import { useAppContext } from "../App/AppProvider"
import GameSquare from "../GameSquare"
import { User, Game, Winner, AppContextActionTypes } from "../Common/types"
import Outcome from "../Outcome"
import "./style.scss"

const GameBoard = (): JSX.Element => {
  const { state, dispatch } = useAppContext()
  const [user, setUser] = useState<User>(User.CROSS)
  const [winner, setWinner] = useState<Winner | null>(null)
  const [clicks, setClicks] = useState<number>(0)
  const [game, setGame] = useState<Game>({
    gameSquare1: null,
    gameSquare2: null,
    gameSquare3: null,
    gameSquare4: null,
    gameSquare5: null,
    gameSquare6: null,
    gameSquare7: null,
    gameSquare8: null,
    gameSquare9: null,
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

  useEffect(() => {
    if (winner === Winner.CROSS) {
      dispatch({
        type: AppContextActionTypes.UPDATE_PLAYER_TWO,
        payload: { ...state.playerTwo, score: state.playerTwo.score + 1 },
      })
    } else if (winner === Winner.NAUGHT) {
      dispatch({
        type: AppContextActionTypes.UPDATE_PLAYER_ONE,
        payload: { ...state.playerOne, score: state.playerOne.score + 1 },
      })
    }
  }, [winner])

  const checkForWin = () => {
    let winnerFound = false
    const winnerLines = [
      ["gameSquare1", "gameSquare2", "gameSquare3"],
      ["gameSquare1", "gameSquare4", "gameSquare7"],
      ["gameSquare1", "gameSquare5", "gameSquare9"],
      ["gameSquare2", "gameSquare5", "gameSquare8"],
      ["gameSquare4", "gameSquare5", "gameSquare6"],
      ["gameSquare7", "gameSquare8", "gameSquare9"],
      ["gameSquare3", "gameSquare6", "gameSquare9"],
      ["gameSquare3", "gameSquare5", "gameSquare7"],
    ]

    winnerLines.forEach((line) => {
      const lineMatches = line.reduce(
        (carry, gameSquare) => {
          switch (game[gameSquare as keyof Game]) {
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
      gameSquare1: null,
      gameSquare2: null,
      gameSquare3: null,
      gameSquare4: null,
      gameSquare5: null,
      gameSquare6: null,
      gameSquare7: null,
      gameSquare8: null,
      gameSquare9: null,
    })
  }

  return (
    <div className="gameBoard" data-testid="gameBoard">
      <div className="gameBoard__inner">
        {Object.keys(game).map((gameSquare: string, index) => {
          return (
            <GameSquare
              key={index}
              type={game[gameSquare as keyof Game]}
              handleClick={() => handleClick(gameSquare as keyof Game)}
              disabled={winner === Winner.DRAW || winner !== null}
            />
          )
        })}
      </div>

      <Outcome winner={winner} resetGame={resetGame} />
    </div>
  )
}

export default GameBoard
