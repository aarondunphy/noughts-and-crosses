import React from "react"
import { render, fireEvent } from "../../utils/testing"
import GameBoard from "./GameBoard"

describe("<GameBoard />", () => {
  it("renders", () => {
    const { getByTestId } = render(<GameBoard />)
    expect(getByTestId("gameBoard")).toBeInTheDocument()
  })

  it("cross plays first", () => {
    const { getByTestId } = render(<GameBoard />)
    const square0 = getByTestId("gameSquare-0")
    fireEvent.click(square0)
    expect(square0).toHaveTextContent("X")
    expect(square0).not.toHaveTextContent("O")
  })

  it("nought plays second", () => {
    const { getByTestId } = render(<GameBoard />)
    const square0 = getByTestId("gameSquare-0")
    fireEvent.click(square0)
    const square1 = getByTestId("gameSquare-1")
    fireEvent.click(square1)
    expect(square1).toHaveTextContent("O")
    expect(square1).not.toHaveTextContent("X")
  })

  it("renders cross winner", () => {
    const { getByTestId, queryByTestId } = render(<GameBoard />)
    fireEvent.click(getByTestId("gameSquare-0"))
    fireEvent.click(getByTestId("gameSquare-7"))
    fireEvent.click(getByTestId("gameSquare-1"))
    fireEvent.click(getByTestId("gameSquare-8"))
    fireEvent.click(getByTestId("gameSquare-2"))
    expect(getByTestId("outcome-winner-cross")).toBeInTheDocument()
    expect(queryByTestId("outcome-winner-nought")).not.toBeInTheDocument()
  })

  it("renders nought winner", () => {
    const { getByTestId, queryByTestId } = render(<GameBoard />)
    fireEvent.click(getByTestId("gameSquare-3"))
    fireEvent.click(getByTestId("gameSquare-0"))
    fireEvent.click(getByTestId("gameSquare-6"))
    fireEvent.click(getByTestId("gameSquare-1"))
    fireEvent.click(getByTestId("gameSquare-8"))
    fireEvent.click(getByTestId("gameSquare-2"))
    expect(getByTestId("outcome-winner-nought")).toBeInTheDocument()
    expect(queryByTestId("outcome-winner-cross")).not.toBeInTheDocument()
  })

  it("renders a draw", () => {
    const { getByTestId, queryByTestId } = render(<GameBoard />)
    fireEvent.click(getByTestId("gameSquare-0"))
    fireEvent.click(getByTestId("gameSquare-3"))
    fireEvent.click(getByTestId("gameSquare-6"))
    fireEvent.click(getByTestId("gameSquare-1"))
    fireEvent.click(getByTestId("gameSquare-5"))
    fireEvent.click(getByTestId("gameSquare-8"))
    fireEvent.click(getByTestId("gameSquare-2"))
    fireEvent.click(getByTestId("gameSquare-4"))
    fireEvent.click(getByTestId("gameSquare-7"))
    expect(getByTestId("outcome-winner-draw")).toBeInTheDocument()
    expect(queryByTestId("outcome-winner-cross")).not.toBeInTheDocument()
    expect(queryByTestId("outcome-winner-nought")).not.toBeInTheDocument()
  })

  it("renders a new gameboard when the player clicks play again", () => {
    const { getByTestId, queryByTestId } = render(<GameBoard />)
    fireEvent.click(getByTestId("gameSquare-0"))
    fireEvent.click(getByTestId("gameSquare-7"))
    fireEvent.click(getByTestId("gameSquare-1"))
    fireEvent.click(getByTestId("gameSquare-8"))
    fireEvent.click(getByTestId("gameSquare-2"))
    const playAgainBtn = getByTestId("outcome-playAgainBtn")
    fireEvent.click(playAgainBtn)
    expect(queryByTestId("outcome-winner-cross")).not.toBeInTheDocument()
    expect(queryByTestId("outcome-winner-nought")).not.toBeInTheDocument()
    expect(queryByTestId("outcome-winner-draw")).not.toBeInTheDocument()
    expect(getByTestId("gameSquare-0")).not.toHaveTextContent("X")
    expect(getByTestId("gameSquare-0")).not.toHaveTextContent("O")
  })
})
