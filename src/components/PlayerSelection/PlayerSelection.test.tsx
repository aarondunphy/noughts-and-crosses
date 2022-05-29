import React from "react"
import { render, fireEvent } from "../../utils/testing"
import PlayerSelection from "./PlayerSelection"

describe("<PlayerSelection />", () => {
  it("renders correctly", () => {
    const { getByTestId, getAllByTestId } = render(<PlayerSelection />)
    expect(getByTestId("ps-startGame-btn")).toBeInTheDocument()
    expect(getByTestId("ps-title")).toBeInTheDocument()
    expect(getAllByTestId("ps-name-input").length).toEqual(2)
  })

  it("alerts if a player's name is missing", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation()
    const { getByTestId } = render(<PlayerSelection />)
    const startGameBtn = getByTestId("ps-startGame-btn")
    fireEvent.click(startGameBtn)
    expect(alertMock).toHaveBeenCalledTimes(1)
  })

  it("does not alert if both players have entered a name", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation()
    const { getByTestId, getAllByTestId } = render(<PlayerSelection />)
    const inputs = getAllByTestId("ps-name-input")
    fireEvent.change(inputs[0], { target: { value: "Name one" } })
    fireEvent.change(inputs[1], { target: { value: "Name two" } })
    const startGameBtn = getByTestId("ps-startGame-btn")
    fireEvent.click(startGameBtn)
    expect(alertMock).toHaveBeenCalledTimes(0)
  })
})
