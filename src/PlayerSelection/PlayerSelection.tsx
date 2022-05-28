import React from "react"
import "./style.scss"
import { useAppContext } from "../App/AppProvider"
import { AppContextActionTypes } from "../Common/types"
import { Button } from "../ui-components"

export default function PlayerSelection(): JSX.Element {
  const { state, dispatch } = useAppContext()

  const handleStartGame = () => {
    if (state.playerOne.name === "" || state.playerTwo.name === "") {
      alert("Please ensure both players have a name set to start the game!")
      return
    }
    dispatch({
      type: AppContextActionTypes.START_GAME,
    })
  }

  return (
    <div className="playerSelection">
      <h2 className="playerSelection__title">Who&apos;s Playing?</h2>

      <div className="playerSelection__playerNamesContainer">
        <div>
          <input
            type="text"
            value={state.playerTwo.name}
            onChange={(e) =>
              dispatch({
                type: AppContextActionTypes.UPDATE_PLAYER_TWO,
                payload: { ...state.playerTwo, name: e.target.value },
              })
            }
            className="playerSelection__input"
            placeholder="Enter player two name..."
          />
          <p className="playerSelection__playerInfo">Playing as crosses</p>
        </div>

        <div>
          <p className="playerSelection__vs">Vs</p>
        </div>

        <div>
          <input
            type="text"
            value={state.playerOne.name}
            onChange={(e) =>
              dispatch({
                type: AppContextActionTypes.UPDATE_PLAYER_ONE,
                payload: { ...state.playerOne, name: e.target.value },
              })
            }
            className="playerSelection__input"
            placeholder="Enter player one name..."
          />
          <p className="playerSelection__playerInfo">Playing as naughts</p>
        </div>
      </div>

      <Button
        onClick={handleStartGame}
        className="playerSelection__startButton"
      >
        Start Game
      </Button>
    </div>
  )
}
