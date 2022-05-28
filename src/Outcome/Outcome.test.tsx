import React from "react"
import { render, fireEvent } from "@testing-library/react"
import AppProvider from "../App/AppProvider"
import Outcome from "./Outcome"
import { Winner } from "../Common/types"

describe("<Outcome />", () => {
  it("renders only the winner naughts", () => {
    const playAgainFnMock = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <AppProvider>
        <Outcome winner={Winner.NAUGHT} resetGame={playAgainFnMock} />
      </AppProvider>
    )
    expect(getByTestId("outcome-winner-naught")).toBeInTheDocument()
    expect(queryByTestId("outcome-winner-cross")).not.toBeInTheDocument()
    expect(queryByTestId("outcome-winner-draw")).not.toBeInTheDocument()
  })

  it("renders only the winner cross", () => {
    const playAgainFnMock = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <AppProvider>
        <Outcome winner={Winner.CROSS} resetGame={playAgainFnMock} />
      </AppProvider>
    )
    expect(getByTestId("outcome-winner-cross")).toBeInTheDocument()
    expect(queryByTestId("outcome-winner-naught")).not.toBeInTheDocument()
    expect(queryByTestId("outcome-winner-draw")).not.toBeInTheDocument()
  })

  it("renders only draw if there are no winners", () => {
    const playAgainFnMock = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <AppProvider>
        <Outcome winner={Winner.DRAW} resetGame={playAgainFnMock} />
      </AppProvider>
    )
    expect(getByTestId("outcome-winner-draw")).toBeInTheDocument()
    expect(queryByTestId("outcome-winner-naught")).not.toBeInTheDocument()
    expect(queryByTestId("outcome-winner-cross")).not.toBeInTheDocument()
  })

  it("resets the game board when the play again button is clicked", () => {
    const playAgainFnMock = jest.fn()
    const { getByTestId } = render(
      <AppProvider>
        <Outcome winner={Winner.DRAW} resetGame={playAgainFnMock} />
      </AppProvider>
    )
    const btn = getByTestId("outcome-playAgainBtn")
    fireEvent.click(btn)
    expect(playAgainFnMock).toHaveBeenCalledTimes(1)
  })
})
