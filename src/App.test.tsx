import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// suite 1
describe("Test initial render", () => {
  test("renders input when app loads", () => {
    render(<App />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
});

// suite 2
// describe("Test user input", () => {
//   test("Renders cards when search text changes", async () => {
//     render(<App />);
//     const inputElement = screen.getByRole("textbox");
//     fireEvent.change(inputElement, { target: { value: "test" } });
//     const cardElement = await screen.findByText(
//       /RXJs Music Searcher/i,
//       { exact: false },
//       { timeout: 5000, interval: 500 }
//     );
//     // const cardElement = await screen.findByText(
//     //   /score/i,
//     //   { exact: false },
//     //   { timeout: 10000, interval: 1000 }
//     // );
//     expect(cardElement).toBeInTheDocument();
//   });
// });
