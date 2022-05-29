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
      onClick={type || disabled ? undefined : handleClick}
      data-testid="gameSquare"
    >
      {type === User.CROSS && <p data-testid="gameSquare-cross">X</p>}
      {type === User.NOUGHT && <p data-testid="gameSquare-nought">O</p>}
    </div>
  )
}

export default GameSquare
