import React from "react"

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
      {type === "cross" && <p>X</p>}
      {type === "naught" && <p>O</p>}
    </div>
  )
}

export default Box
