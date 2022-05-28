import React from "react"
import "./style.scss"
import { useAppContext } from "../App/AppProvider"
import { AppContextActionTypes } from "../Common/types"
import { Button } from "../ui-components"

export default function PlayerSelection(): JSX.Element {
  const { state, dispatch } = useAppContext()

  const handleStartGame = () => {
    if (state.playerOne === "" || state.playerTwo === "") {
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
            value={state.playerTwo}
            onChange={(e) =>
              dispatch({
                type: AppContextActionTypes.SET_PLAYER_TWO_NAME,
                payload: { value: e.target.value },
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
            value={state.playerOne}
            onChange={(e) =>
              dispatch({
                type: AppContextActionTypes.SET_PLAYER_ONE_NAME,
                payload: { value: e.target.value },
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
