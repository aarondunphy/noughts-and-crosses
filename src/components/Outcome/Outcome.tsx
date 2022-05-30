import React from "react"
import { useGameContext } from "../../providers/GameProvider"
import { Winner, OutcomeProps } from "../../common/types"
import { Button } from "../../ui-components"
import "./style.scss"

export default function Outcome({
  winner,
  resetGame,
}: OutcomeProps): JSX.Element {
  const { state } = useGameContext()
  return (
    <div className="outcome">
      {winner === Winner.CROSS && (
        <h2 className="outcome__winner" data-testid="outcome-winner-cross">
          {state.playerOne.name} Wins! 🎉
        </h2>
      )}
      {winner === Winner.NOUGHT && (
        <h2 className="outcome__winner" data-testid="outcome-winner-nought">
          {state.playerTwo.name} Wins! 🎉
        </h2>
      )}
      {winner === Winner.DRAW && (
        <h2 className="outcome__winner" data-testid="outcome-winner-draw">
          Draw! 🤷‍♂️
        </h2>
      )}
      {winner !== null && (
        <Button
          className="outcome__playAgainButton"
          onClick={resetGame}
          testid="outcome-playAgainBtn"
        >
          Play Again!
        </Button>
      )}
    </div>
  )
}
