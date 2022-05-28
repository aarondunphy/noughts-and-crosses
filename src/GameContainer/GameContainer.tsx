import React from "react"
import { useAppContext } from "../App/AppProvider"
import GameBoard from "../GameBoard"
import PlayerSelection from "../PlayerSelection"
import Score from "../Score"
import "./style.scss"

export default function GameContainer(): JSX.Element {
  const { state } = useAppContext()

  return (
    <div className="gameContainer">
      <h1 className="gameContainer__title">Naughts &amp; Crosses</h1>
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
