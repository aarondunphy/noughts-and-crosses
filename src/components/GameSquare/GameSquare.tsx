import React from "react"
import { GameSquareProps, User } from "../../common/types"
import "./style.scss"

const GameSquare = ({
  type,
  disabled,
  handleClick,
}: GameSquareProps): JSX.Element => {
  return (
    <div
      className={"gameSquare " + (type || disabled ? "has-value" : "no-value")}
      onClick={handleClick}
    >
      {type === User.CROSS && <p>X</p>}
      {type === User.NOUGHT && <p>O</p>}
    </div>
  )
}

export default GameSquare
