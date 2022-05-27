import React from "react"
import { BoxProps, User } from "../Common/types"

const Box = ({ type, disabled, handleClick }: BoxProps): JSX.Element => {
  return (
    <div
      className={"box " + (type || disabled ? "has-value" : "no-value")}
      onClick={handleClick}
    >
      {type === User.CROSS && <p>X</p>}
      {type === User.NAUGHT && <p>O</p>}
    </div>
  )
}

export default Box
