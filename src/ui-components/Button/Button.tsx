import React from "react"
import { ButtonProps } from "../../Common/types"
import "./style.scss"

export default function Button({
  onClick,
  className,
  children,
  testid,
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`btn ${className}`}
      onClick={onClick}
      data-testid={testid}
    >
      {children}
    </button>
  )
}
