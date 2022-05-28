import React from "react"

export enum User {
  NOUGHT = "Nought",
  CROSS = "Cross",
}

export enum Winner {
  NOUGHT = "Nought",
  CROSS = "Cross",
  DRAW = "Draw",
}
export type GameSquareType = User | null

export interface GameSquareProps {
  type: string | null
  disabled: boolean
  handleClick?: () => void
}

export interface OutcomeProps {
  winner: Winner | null
  resetGame: () => void
}

export interface GameContextType {
  playerOne: Player
  playerTwo: Player
  startGame?: boolean
}

export interface Player {
  name: string
  score: number
}

export interface GameProviderProps {
  children: React.ReactNode
}

export enum GameContextActionTypes {
  UPDATE_PLAYER_ONE = "Update player one",
  UPDATE_PLAYER_TWO = "Update player two",
  START_GAME = "Start game",
}

export type GameContextAction =
  | {
      type: GameContextActionTypes.UPDATE_PLAYER_ONE
      payload: Player
    }
  | {
      type: GameContextActionTypes.UPDATE_PLAYER_TWO
      payload: Player
    }
  | {
      type: GameContextActionTypes.START_GAME
    }
export interface GameContextReducer {
  state: GameContextType
  dispatch: (action: GameContextAction) => void
}

export interface ButtonProps {
  onClick: () => void
  className: string
  children: React.ReactNode
  testid?: string
}
