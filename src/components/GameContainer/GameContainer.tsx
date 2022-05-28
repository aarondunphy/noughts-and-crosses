import React from "react"
import { useGameContext } from "../../providers/GameProvider"
import GameBoard from "../GameBoard"
import PlayerSelection from "../PlayerSelection"
import Score from "../Score"
import "./style.scss"

export default function GameContainer(): JSX.Element {
  const { state } = useGameContext()

  return (
    <div className="gameContainer">
      <h1 className="gameContainer__title">Noughts &amp; Crosses</h1>
      {state.startGame === false && <PlayerSelection />}

      {state.startGame === true && (
        <>
          <Score />
          <GameBoard />
        </>
      )}
    </div>
  )
}
