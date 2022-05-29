import { useState, useEffect } from "react"
import { useGameContext } from "../providers/GameProvider"
import {
  User,
  Winner,
  GameContextActionTypes,
  GameSquareType,
} from "../common/types"

export const useGame = () => {
  const { state, dispatch } = useGameContext()
  const [user, setUser] = useState<User>(User.CROSS)
  const [winner, setWinner] = useState<Winner | null>(null)
  const [clicks, setClicks] = useState<number>(0)
  const [game, setGame] = useState<GameSquareType[]>(Array(9).fill(null))

  const updateGame = (gameIndex: number, value: User) => {
    const gameCopy = [...game]
    gameCopy[gameIndex] = value
    setGame(gameCopy)
  }

  const handleClick = (gameIndex: number) => {
    setClicks(clicks + 1)
    updateGame(gameIndex, user)
    setUser(user === User.NOUGHT ? User.CROSS : User.NOUGHT)
  }

  useEffect(() => {
    checkForWin()
  }, [game])

  useEffect(() => {
    if (winner === Winner.CROSS) {
      dispatch({
        type: GameContextActionTypes.UPDATE_PLAYER_TWO,
        payload: { ...state.playerTwo, score: state.playerTwo.score + 1 },
      })
    } else if (winner === Winner.NOUGHT) {
      dispatch({
        type: GameContextActionTypes.UPDATE_PLAYER_ONE,
        payload: { ...state.playerOne, score: state.playerOne.score + 1 },
      })
    }
  }, [winner])

  const checkForWin = () => {
    let winnerFound = false
    const winningLines = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [2, 4, 6],
    ]

    for (const line of winningLines) {
      const [square1, square2, square3] = line
      if (
        game[square1] !== null &&
        game[square1] === game[square2] &&
        game[square2] === game[square3]
      ) {
        winnerFound = true
        setWinner(game[square1] === User.CROSS ? Winner.CROSS : Winner.NOUGHT)
        break
      }
    }

    if (clicks === 9 && winnerFound === false) {
      setWinner(Winner.DRAW)
    }
  }

  const resetGame = () => {
    setUser(User.CROSS)
    setWinner(null)
    setClicks(0)
    setGame(Array(9).fill(null))
  }

  return {
    game,
    winner,
    resetGame,
    handleClick,
  }
}
