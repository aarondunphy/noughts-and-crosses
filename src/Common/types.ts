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
