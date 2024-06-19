import { SyntheticEvent, useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import { cityType } from "../assets/types";
import { requestCity } from "../assets/requestInfo";
import CityModal from "../components/CityModal";

const proxyCity: cityType[] = [
  {
    name: "City name",
    region: "Volda",
    size: "Village",
    population: 1000,
    description: "Some description",
  },
];

const CitysPage = () => {
  const [loading, isLoading] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("");
  const [cityList, setCityList] = useState<cityType[]>(proxyCity);
  const [cityFilter, setCityFilter] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  };

  const searchByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value.length > 1
      ? setCityFilter(event.target.value)
      : setCityFilter("");
  };

  const fetchCityData = () => {
    isLoading(false);
    fetch(requestCity, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((results) => {
        setCityList(results);
      })
      .catch((e) => console.error("City fetch threw error: ", e))
      .finally(() => isLoading(true));
  };

  const addCityToTheList = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    if (cityName.length > 2) {
      fetch(requestCity, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cityName,
          region: "Volda",
          size: "Village",
          population: 1000,
          description: "Description text",
        }),
      })
        .then((data) => data.json())
        .then((results) => {
          setCityList([...cityList, results]);
        })
        .catch((e) => console.error(e));
      setCityName("");
    }
  };

  const data_from_modal = (data: cityType) => {
    setCityList([...cityList, data]);
  };

  const cityId = async (data: number) => {
    await fetch(`${requestCity + "/" + data}`, {
      method: "DELETE",
    }).then();
    fetchCityData();
  };

  useEffect(() => {
    fetchCityData();
  }, []);

  const listOfCitys = cityList
    .filter((filter) =>
      filter.name.toLocaleLowerCase().includes(cityFilter.toLocaleLowerCase())
    )
    .map((city, index) => (
      // <Link to={`/city/${index}`} key={index + city.name}>
      <CityCard city={city} key={index + city.name} deleteCity={cityId} />
      // </Link>
    ));

  return (
    <>
      <div className="m-2">
        <CityModal
          title={"Add new city"}
          citydata={data_from_modal}
        ></CityModal>
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
            onChange={searchByName}
          />
        </div>
        {loading ? (
          <div className="grid grid-cols-4 gap-4">{listOfCitys}</div>
        ) : (
          <div className="m-2">Loading</div>
        )}
      </div>
    </>
  );
};
export default CitysPage;
