export enum Option {
  Naught = "NAUGHT",
  Cross = "CROSS",
}

export interface Game {
  box1: Option | null
  box2: Option | null
  box3: Option | null
  box4: Option | null
  box5: Option | null
  box6: Option | null
  box7: Option | null
  box8: Option | null
  box9: Option | null
}

export interface BoxProps {
  type: string | null
  disabled: boolean
  handleClick?: () => void
}
