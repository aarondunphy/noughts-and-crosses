import React from "react"
import { Winner, OutcomeProps } from "../Common/types"

export default function Outcome({
  winner,
  resetGame,
}: OutcomeProps): JSX.Element {
  return (
    <>
      {winner === Winner.CROSS && (
        <>
          <h2>Cross Wins! 🎉</h2>
          <button type="button" className="playAgainBtn" onClick={resetGame}>
            Play Again!
          </button>
        </>
      )}
      {winner === Winner.NAUGHT && (
        <>
          <h2>Naught Wins! 🎉</h2>
          <button type="button" className="playAgainBtn" onClick={resetGame}>
            Play Again!
          </button>
        </>
      )}
      {winner === Winner.DRAW && (
        <>
          <h2>Draw! 🤷‍♂️</h2>
          <button type="button" className="playAgainBtn" onClick={resetGame}>
            Play Again!
          </button>
        </>
      )}
    </>
  )
}
