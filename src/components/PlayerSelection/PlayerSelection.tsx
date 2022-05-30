import React from "react"
import "./style.scss"
import { useGameContext } from "../../providers/GameProvider"
import { GameContextActionTypes } from "../../common/types"
import { Button } from "../../ui-components"

export default function PlayerSelection(): JSX.Element {
  const { state, dispatch } = useGameContext()

  const handleStartGame = () => {
    if (state.playerOne.name === "" || state.playerTwo.name === "") {
      alert("Please ensure both players have a name set to start the game!")
      return
    }
    dispatch({
      type: GameContextActionTypes.START_GAME,
    })
  }

  return (
    <div className="playerSelection" data-testid="playerSelection">
      <h2 className="playerSelection__title" data-testid="ps-title">
        Who&apos;s Playing?
      </h2>

      <div className="playerSelection__playerNamesContainer">
        <div>
          <input
            type="text"
            value={state.playerOne.name}
            onChange={(e) =>
              dispatch({
                type: GameContextActionTypes.UPDATE_PLAYER_ONE,
                payload: { ...state.playerOne, name: e.target.value },
              })
            }
            className="playerSelection__input"
            placeholder="Player one name..."
            data-testid="ps-name-input"
          />
          <p className="playerSelection__playerInfo">Playing as crosses</p>
        </div>

        <div>
          <p className="playerSelection__vs">Vs</p>
        </div>

        <div>
          <input
            type="text"
            value={state.playerTwo.name}
            onChange={(e) =>
              dispatch({
                type: GameContextActionTypes.UPDATE_PLAYER_TWO,
                payload: { ...state.playerTwo, name: e.target.value },
              })
            }
            className="playerSelection__input"
            placeholder="Player two name..."
            data-testid="ps-name-input"
          />
          <p className="playerSelection__playerInfo">Playing as noughts</p>
        </div>
      </div>

      <Button
        testid="ps-startGame-btn"
        className="playerSelection__startButton"
        onClick={handleStartGame}
      >
        Start Game
      </Button>
    </div>
  )
}
