import React from "react"
import { render } from "@testing-library/react"
import AppProvider from "../App/AppProvider"
import Score from "./Score"

describe("<Score />", () => {
  it("renders correctly", () => {
    const { getByTestId, getAllByTestId } = render(
      <AppProvider>
        <Score />
      </AppProvider>
    )
    expect(getByTestId("score-title")).toBeInTheDocument()
    expect(getAllByTestId("score-player").length).toEqual(2)
  })
})
