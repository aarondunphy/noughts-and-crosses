import React from "react"
import { useAppContext } from "../App/AppProvider"
import "./style.scss"

export default function Score(): JSX.Element {
  const { state } = useAppContext()

  return (
    <div className="score">
      <h4 className="score__title" data-testid="score-title">
        Score
      </h4>

      <p className="score__player" data-testid="score-player">
        <span>{state.playerOne.name}:</span>
        <span>{state.playerOne.score}</span>
      </p>
      <p className="score__player" data-testid="score-player">
        <span>{state.playerTwo.name}:</span>
        <span>{state.playerTwo.score}</span>
      </p>
    </div>
  )
}
