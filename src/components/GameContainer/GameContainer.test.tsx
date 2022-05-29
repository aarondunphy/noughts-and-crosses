import React from "react"
import { render, fireEvent } from "../../utils/testing"
import GameContainer from "./GameContainer"

describe("<GameContainer />", () => {
  it("renders only the <PlayerSelection /> initially", () => {
    const { getByTestId, queryByTestId } = render(<GameContainer />)
    expect(getByTestId("playerSelection")).toBeInTheDocument()
    expect(queryByTestId("gameBoard")).not.toBeInTheDocument()
  })

  it("changes to <Gameboard /> and removes <PlayerSelection /> when the player starts the game", () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <GameContainer />
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
