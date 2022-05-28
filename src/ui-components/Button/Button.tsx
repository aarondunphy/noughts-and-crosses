import React from "react"
import { ButtonProps } from "../../Common/types"
import "./style.scss"

export default function Button({
  onClick,
  className,
  children,
}: ButtonProps): JSX.Element {
  return (
    <button type="button" className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
