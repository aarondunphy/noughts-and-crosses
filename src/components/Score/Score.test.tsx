import React from "react"
import { render } from "../../utils/testing"
import Score from "./Score"

describe("<Score />", () => {
  it("renders correctly", () => {
    const { getByTestId, getAllByTestId } = render(<Score />)
    expect(getByTestId("score-title")).toBeInTheDocument()
    expect(getAllByTestId("score-player").length).toEqual(2)
  })
})
