import React from "react"
import { render, fireEvent } from "../../utils/testing"
import GameSquare from "./GameSquare"
import { User } from "../../common/types"

describe("<GameSquare />", () => {
  it("registers a click event", () => {
    const handleClickMockFn = jest.fn()
    const { getByTestId } = render(
      <GameSquare
        type={null}
        disabled={false}
        handleClick={handleClickMockFn}
      />
    )
    const square = getByTestId("gameSquare")
    fireEvent.click(square)
    expect(handleClickMockFn).toHaveBeenCalled()
  })

  it("does not register a click event when disabled", () => {
    const handleClickMockFn = jest.fn()
    const { getByTestId } = render(
      <GameSquare type={null} disabled={true} handleClick={handleClickMockFn} />
    )
    const square = getByTestId("gameSquare")
    fireEvent.click(square)
    expect(handleClickMockFn).not.toHaveBeenCalled()
  })

  it("does not register a click event when has been clicked before", () => {
    const handleClickMockFn = jest.fn()
    const { getByTestId } = render(
      <GameSquare
        type={User.CROSS}
        disabled={false}
        handleClick={handleClickMockFn}
      />
    )
    const square = getByTestId("gameSquare")
    fireEvent.click(square)
    expect(handleClickMockFn).not.toHaveBeenCalled()
  })

  it("renders cross when clicked by cross user", () => {
    const handleClickMockFn = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <GameSquare
        type={User.CROSS}
        disabled={false}
        handleClick={handleClickMockFn}
      />
    )
    expect(getByTestId("gameSquare-cross")).toBeInTheDocument()
    expect(queryByTestId("gameSquare-nought")).not.toBeInTheDocument()
  })

  it("renders nought when clicked by nought user", () => {
    const handleClickMockFn = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <GameSquare
        type={User.NOUGHT}
        disabled={false}
        handleClick={handleClickMockFn}
      />
    )
    expect(getByTestId("gameSquare-nought")).toBeInTheDocument()
    expect(queryByTestId("gameSquare-cross")).not.toBeInTheDocument()
  })
})
