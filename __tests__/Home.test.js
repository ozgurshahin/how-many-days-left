import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home page", () => {
  it("renders the button with correct label", () => {
    render(<Home />);
    expect(
      screen.getByRole("button", { name: /okudum, anladım/i }),
    ).toBeInTheDocument();
  });
});
