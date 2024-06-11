import { render } from "@testing-library/react";
import CityPage from "../../pages/CityPage";

it("Renders not found page", () => {
  const { getAllByText } = render(<CityPage />);

  expect(getAllByText("Hello")).toBeTruthy();
});
