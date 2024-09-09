import { fireEvent, render } from "@testing-library/react";

import { cityType } from "../../entities/types";
import CityCard from "src/components/card/CityCard";

const proxyCity: cityType = {
  _id: "1",
  name: "City name",
  region: "Region",
  size: "Village",
  population: 1000,
  description: "Some description",
};

describe("City card", () => {
  it("displays city name correctly", () => {
    const { getByText } = render(<CityCard city={proxyCity}></CityCard>);
    expect(getByText(proxyCity.name)).toBeTruthy();
  });

  it("displays city size and region correctly", () => {
    const { getByText } = render(<CityCard city={proxyCity}></CityCard>);

    expect(getByText(`${proxyCity.size} in ${proxyCity.region}`)).toBeTruthy();
  });

  it("displays city population correctly", () => {
    const { getByText } = render(<CityCard city={proxyCity}></CityCard>);

    expect(getByText(`Population - ${proxyCity.population}`)).toBeTruthy();
  });

  it("displays city description correctly", () => {
    const { getByText } = render(<CityCard city={proxyCity}></CityCard>);
    expect(getByText(proxyCity.description)).toBeTruthy();
  });

  it("displays delete button correctly", () => {
    const { getByRole } = render(<CityCard city={proxyCity}></CityCard>);
    expect(getByRole("button", { name: "Delete" })).toBeTruthy();
  });

  it("calls delete when delete button is clicked", () => {
    const deleteCityMock = jest.fn();
    const { getByRole } = render(
      <CityCard city={proxyCity} deleteCity={deleteCityMock}></CityCard>
    );
    const deleteButton = getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);
    expect(deleteCityMock).toHaveBeenCalledWith(proxyCity.id);
  });
});
