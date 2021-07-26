import React from "react"
import { render, screen } from "@testing-library/react"
import Index from "./index"
import { Keyword } from "@iaf/api"

test("renders finish card", () => {
  render(
    <Index
      name="Scenario A"
      steps={[
        { id: "1", keyword: Keyword.Visit, value: "http://example.com/" },
      ]}
    />
  )
  const finishCardElement = screen.getByText(/Finish/i)
  expect(finishCardElement).toBeInTheDocument()
})
