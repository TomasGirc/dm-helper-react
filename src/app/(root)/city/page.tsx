"use client";

import { SyntheticEvent, useState } from "react";
import CityCard from "src/components/CityCard";
import CityModal from "src/components/CityModal";
import { searchByName } from "src/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCitys, fetchCitys } from "src/api/citys";

const City = () => {
  const queryClient = useQueryClient();

  const [cityName, setCityName] = useState<string>("");
  const [cityFilter, setCityFilter] = useState("");

  const { data: city, isLoading } = useQuery({
    queryFn: () => fetchCitys(),
    queryKey: ["citys"],
    staleTime: Infinity,
  });

  const { mutateAsync: addCityMutation } = useMutation({
    mutationFn: addCitys,
    onSuccess: () => {
      queryClient.invalidateQueries(["citys"]);
      setCityName("");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  };

  const addCityToTheList = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    addCityMutation({
      name: cityName,
      region: "Volda",
      size: "Village",
      population: 1000,
      description: "Description text",
    });
  };

  const listOfCitys = city
    ?.filter((filter) =>
      filter.name.toLocaleLowerCase().includes(cityFilter.toLocaleLowerCase())
    )
    .map((city, index) => <CityCard city={city} key={index + city.name} />);

  return (
    <>
      <div className="m-2">
        <CityModal title={"Add new city"}></CityModal>
        <div className="flex mb-1">
          <form onSubmit={addCityToTheList} className="mr-1 ">
            <input
              placeholder="Add city"
              type="text"
              id="new-todo-input"
              className="input input__lg"
              name="text"
              autoComplete="off"
              value={cityName}
              onChange={handleChange}
            />
          </form>
          <input
            placeholder="Search for city"
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            onChange={(e) => setCityFilter(searchByName(e.target.value))}
          />
        </div>
        {!isLoading ? (
          <div className="grid grid-cols-4 gap-4">{listOfCitys}</div>
        ) : (
          <div className="m-2">Loading</div>
        )}
      </div>
    </>
  );
};
export default City;
