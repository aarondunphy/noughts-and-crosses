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
  playerOne: Player
  playerTwo: Player
  startGame?: boolean
}

export interface Player {
  name: string
  score: number
}

export interface AppProviderProps {
  children: React.ReactNode
}

export enum AppContextActionTypes {
  UPDATE_PLAYER_ONE = "Update player one",
  UPDATE_PLAYER_TWO = "Update player two",
  START_GAME = "Start game",
}

export type AppContextAction =
  | {
      type: AppContextActionTypes.UPDATE_PLAYER_ONE
      payload: Player
    }
  | {
      type: AppContextActionTypes.UPDATE_PLAYER_TWO
      payload: Player
    }
  | {
      type: AppContextActionTypes.START_GAME
    }
export interface AppContextReducer {
  state: AppContextType
  dispatch: (action: AppContextAction) => void
}

export interface ButtonProps {
  onClick: () => void
  className: string
  children: React.ReactNode
}
