import React from "react"
import { useAppContext } from "../App/AppProvider"
import { Winner, OutcomeProps } from "../Common/types"
import { Button } from "../ui-components"
import "./style.scss"

export default function Outcome({
  winner,
  resetGame,
}: OutcomeProps): JSX.Element {
  const { state } = useAppContext()
  return (
    <div className="outcome">
      {winner === Winner.CROSS && (
        <h2 className="outcome__winner">{state.playerTwo.name} Wins! 🎉</h2>
      )}
      {winner === Winner.NAUGHT && (
        <h2 className="outcome__winner">{state.playerOne.name} Wins! 🎉</h2>
      )}
      {winner === Winner.DRAW && <h2 className="outcome__winner">Draw! 🤷‍♂️</h2>}
      {winner !== null && (
        <Button className="outcome__playAgainButton" onClick={resetGame}>
          Play Again!
        </Button>
      )}
    </div>
  )
}
