import React from "react"
import { render } from "@testing-library/react"
import GameProvider from "../../providers/GameProvider"
import Score from "./Score"

describe("<Score />", () => {
  it("renders correctly", () => {
    const { getByTestId, getAllByTestId } = render(
      <GameProvider>
        <Score />
      </GameProvider>
    )
    expect(getByTestId("score-title")).toBeInTheDocument()
    expect(getAllByTestId("score-player").length).toEqual(2)
  })
})
