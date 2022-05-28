import React from "react"
import { useAppContext } from "../App/AppProvider"
import "./style.scss"

export default function Score(): JSX.Element {
  const { state } = useAppContext()

  return (
    <div className="score">
      <h4 className="score__title">Score</h4>

      <p className="score__player">
        <span>{state.playerOne.name}:</span>
        <span>{state.playerOne.score}</span>
      </p>
      <p className="score__player">
        <span>{state.playerTwo.name}:</span>
        <span>{state.playerTwo.score}</span>
      </p>
    </div>
  )
}
