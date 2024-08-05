import { render } from "@testing-library/react";
import { mainListItems, secondaryListItems } from "../../components/ListItems";
import { BrowserRouter } from "react-router-dom";

describe("Primary list item", () => {
  it("Displays home in the list", () => {
    const { getByText } = render(
      <BrowserRouter>{mainListItems}</BrowserRouter>
    );
    expect(getByText("Home")).toBeTruthy();
  });
  it("Displays cities in the list", () => {
    const { getByText } = render(
      <BrowserRouter>{mainListItems}</BrowserRouter>
    );
    expect(getByText("Cities")).toBeTruthy();
  });
  it("Displays testables in the list", () => {
    const { getByText } = render(
      <BrowserRouter>{mainListItems}</BrowserRouter>
    );
    expect(getByText("Testable components")).toBeTruthy();
  });
  it("Displays character page in the list", () => {
    const { getByText } = render(
      <BrowserRouter>{mainListItems}</BrowserRouter>
    );
    expect(getByText("Character")).toBeTruthy();
  });
  it("Displays items in the list", () => {
    const { getByText } = render(
      <BrowserRouter>{mainListItems}</BrowserRouter>
    );
    expect(getByText("Items")).toBeTruthy();
  });
});

describe("Secondary list item", () => {
  it("Displays Saved reports in the list", () => {
    const { getByText } = render(
      <BrowserRouter>{secondaryListItems}</BrowserRouter>
    );
    expect(getByText("Saved reports")).toBeTruthy();
  });
  it("Displays Current month reports in the list", () => {
    const { getByText } = render(
      <BrowserRouter>{secondaryListItems}</BrowserRouter>
    );
    expect(getByText("Current month")).toBeTruthy();
  });
});
