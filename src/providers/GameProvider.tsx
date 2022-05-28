import React, { createContext, useContext, useReducer } from "react"
import {
  GameContextType,
  GameProviderProps,
  GameContextAction,
  GameContextReducer,
  GameContextActionTypes,
} from "../common/types"

export const GameContext = createContext<GameContextReducer | undefined>(
  undefined
)

const gameReducer = (state: GameContextType, action: GameContextAction) => {
  switch (action.type) {
    case GameContextActionTypes.UPDATE_PLAYER_ONE: {
      return {
        ...state,
        playerOne: action.payload,
      }
    }
    case GameContextActionTypes.UPDATE_PLAYER_TWO: {
      return {
        ...state,
        playerTwo: action.payload,
      }
    }
    case GameContextActionTypes.START_GAME: {
      return { ...state, startGame: true }
    }
    default: {
      return state
    }
  }
}

export const useGameContext = (): GameContextReducer => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGameContext must be used within an GameProvider")
  }
  return context
}

export default function GameProvider({
  children,
}: GameProviderProps): JSX.Element {
  const initialState: GameContextType = {
    playerOne: { name: "", score: 0 },
    playerTwo: { name: "", score: 0 },
    startGame: false,
  }
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const value = { state, dispatch }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
