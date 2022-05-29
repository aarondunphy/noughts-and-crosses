import React from "react"
import GameSquare from "../GameSquare"
import { Winner, GameSquareType } from "../../common/types"
import Outcome from "../Outcome"
import "./style.scss"
import { useGame } from "../../hooks/useGame"

const GameBoard = (): JSX.Element => {
  const { game, winner, resetGame, handleClick } = useGame()

  return (
    <div className="gameBoard" data-testid="gameBoard">
      <div className="gameBoard__inner">
        {game.map((gameSquare: GameSquareType, index) => {
          return (
            <GameSquare
              key={index}
              testid={`gameSquare-${index}`}
              type={gameSquare}
              handleClick={() => handleClick(index)}
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
