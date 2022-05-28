import React from "react"
import { render, fireEvent } from "@testing-library/react"
import AppProvider from "../App/AppProvider"
import GameContainer from "./GameContainer"

describe("<GameContainer />", () => {
  it("renders only the <PlayerSelection /> initially", () => {
    const { getByTestId, queryByTestId } = render(
      <AppProvider>
        <GameContainer />
      </AppProvider>
    )
    expect(getByTestId("playerSelection")).toBeInTheDocument()
    expect(queryByTestId("gameBoard")).not.toBeInTheDocument()
  })

  it("changes to <Gameboard /> and removes <PlayerSelection /> when the player starts the game", () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <AppProvider>
        <GameContainer />
      </AppProvider>
    )
    const inputs = getAllByTestId("ps-name-input")
    fireEvent.change(inputs[0], { target: { value: "Name one" } })
    fireEvent.change(inputs[1], { target: { value: "Name two" } })
    const startGameBtn = getByTestId("ps-startGame-btn")
    fireEvent.click(startGameBtn)
    expect(getByTestId("gameBoard")).toBeInTheDocument()
    expect(queryByTestId("playerSelection")).not.toBeInTheDocument()
  })
})
