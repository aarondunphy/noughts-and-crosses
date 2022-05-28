import React from "react"

export enum User {
  NAUGHT = "Naught",
  CROSS = "Cross",
}

export enum Winner {
  NAUGHT = "Naught",
  CROSS = "Cross",
  DRAW = "Draw",
}

export interface Game {
  box1: User | null
  box2: User | null
  box3: User | null
  box4: User | null
  box5: User | null
  box6: User | null
  box7: User | null
  box8: User | null
  box9: User | null
}

export interface BoxProps {
  type: string | null
  disabled: boolean
  handleClick?: () => void
}

export interface OutcomeProps {
  winner: Winner | null
  resetGame: () => void
}

export interface AppContextType {
  playerOne?: string
  playerTwo?: string
  startGame?: boolean
}

export interface AppProviderProps {
  children: React.ReactNode
}

export type AppContextAction =
  | {
      type: AppContextActionTypes.SET_PLAYER_ONE_NAME
      payload: { value: string }
    }
  | {
      type: AppContextActionTypes.SET_PLAYER_TWO_NAME
      payload: { value: string }
    }
  | {
      type: AppContextActionTypes.START_GAME
    }

export enum AppContextActionTypes {
  SET_PLAYER_ONE_NAME = "Set player one name",
  SET_PLAYER_TWO_NAME = "Set player two name",
  START_GAME = "Start game",
}

export interface AppContextReducer {
  state: AppContextType
  dispatch: Dispatch
}

export type Dispatch = (action: AppContextAction) => void

export interface ButtonProps {
  onClick: () => void
  className: string
  children: React.ReactNode
}
