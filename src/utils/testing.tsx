import React, { FC, ReactElement } from "react"
import { render, RenderOptions } from "@testing-library/react"
import GameProvider from "../providers/GameProvider"

const RenderWithProviders: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <GameProvider>{children}</GameProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: RenderWithProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }
