import React from "react"
import { render, fireEvent } from "@testing-library/react"
import AppProvider from "../App/AppProvider"
import PlayerSelection from "./PlayerSelection"

describe("<PlayerSelection />", () => {
  it("renders correctly", () => {
    const { getByTestId, getAllByTestId } = render(
      <AppProvider>
        <PlayerSelection />
      </AppProvider>
    )
    expect(getByTestId("ps-startGame-btn")).toBeInTheDocument()
    expect(getByTestId("ps-title")).toBeInTheDocument()
    expect(getAllByTestId("ps-name-input").length).toEqual(2)
  })

  it("alerts if a player's name is missing", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation()
    const { getByTestId } = render(
      <AppProvider>
        <PlayerSelection />
      </AppProvider>
    )
    const startGameBtn = getByTestId("ps-startGame-btn")
    fireEvent.click(startGameBtn)
    expect(alertMock).toHaveBeenCalledTimes(1)
  })

  it("does not alert if both players have entered a name", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation()
    const { getByTestId, getAllByTestId } = render(
      <AppProvider>
        <PlayerSelection />
      </AppProvider>
    )
    const inputs = getAllByTestId("ps-name-input")
    fireEvent.change(inputs[0], { target: { value: "Name one" } })
    fireEvent.change(inputs[1], { target: { value: "Name two" } })
    const startGameBtn = getByTestId("ps-startGame-btn")
    fireEvent.click(startGameBtn)
    expect(alertMock).toHaveBeenCalledTimes(0)
  })
})
