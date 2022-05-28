import React, { createContext, useContext, useReducer } from "react"
import {
  AppContextType,
  AppProviderProps,
  AppContextAction,
  AppContextReducer,
  AppContextActionTypes,
} from "../Common/types"

export const AppContext = createContext<AppContextReducer | undefined>(
  undefined
)

const appReducer = (state: AppContextType, action: AppContextAction) => {
  switch (action.type) {
    case AppContextActionTypes.SET_PLAYER_ONE_NAME: {
      return { ...state, playerOne: action.payload.value }
    }
    case AppContextActionTypes.SET_PLAYER_TWO_NAME: {
      return { ...state, playerTwo: action.payload.value }
    }
    case AppContextActionTypes.START_GAME: {
      return { ...state, startGame: true }
    }
    default: {
      return state
    }
  }
}

export const useAppContext = (): AppContextReducer => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export default function AppProvider({
  children,
}: AppProviderProps): JSX.Element {
  const initialState: AppContextType = {
    playerOne: "",
    playerTwo: "",
    startGame: false,
  }
  const [state, dispatch] = useReducer(appReducer, initialState)
  const value = { state, dispatch }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
