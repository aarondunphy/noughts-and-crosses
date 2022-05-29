import React from "react"
import { render, fireEvent } from "../../utils/testing"
import Outcome from "./Outcome"
import { Winner } from "../../common/types"

describe("<Outcome />", () => {
  it("renders only the winner noughts", () => {
    const playAgainFnMock = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <Outcome winner={Winner.NOUGHT} resetGame={playAgainFnMock} />
    )
    expect(getByTestId("outcome-winner-nought")).toBeInTheDocument()
    expect(queryByTestId("outcome-winner-cross")).not.toBeInTheDocument()
    expect(queryByTestId("outcome-winner-draw")).not.toBeInTheDocument()
  })

  it("renders only the winner cross", () => {
    const playAgainFnMock = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <Outcome winner={Winner.CROSS} resetGame={playAgainFnMock} />
    )
    expect(getByTestId("outcome-winner-cross")).toBeInTheDocument()
    expect(queryByTestId("outcome-winner-nought")).not.toBeInTheDocument()
    expect(queryByTestId("outcome-winner-draw")).not.toBeInTheDocument()
  })

  it("renders only draw if there are no winners", () => {
    const playAgainFnMock = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <Outcome winner={Winner.DRAW} resetGame={playAgainFnMock} />
    )
    expect(getByTestId("outcome-winner-draw")).toBeInTheDocument()
    expect(queryByTestId("outcome-winner-nought")).not.toBeInTheDocument()
    expect(queryByTestId("outcome-winner-cross")).not.toBeInTheDocument()
  })

  it("resets the game board when the play again button is clicked", () => {
    const playAgainFnMock = jest.fn()
    const { getByTestId } = render(
      <Outcome winner={Winner.DRAW} resetGame={playAgainFnMock} />
    )
    const btn = getByTestId("outcome-playAgainBtn")
    fireEvent.click(btn)
    expect(playAgainFnMock).toHaveBeenCalledTimes(1)
  })
})
