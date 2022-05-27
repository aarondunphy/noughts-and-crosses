import React from "react"
import { Option } from "./Board"

interface BoxProps {
  type: string | null
  disabled: boolean
  handleClick?: () => void
}

const Box = ({ type, disabled, handleClick }: BoxProps): JSX.Element => {
  return (
    <div
      className={"box " + (type || disabled ? "has-value" : "no-value")}
      onClick={handleClick}
    >
      {type === Option.Cross && <p>X</p>}
      {type === Option.Naught && <p>O</p>}
    </div>
  )
}

export default Box
