import { SyntheticEvent, useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import { cityType } from "../assets/types";
import { Link } from "react-router-dom";
import { ModalWindow } from "../components/ModalWindow";

const proxyCity: cityType[] = [
  {
    name: "City name",
    region: "Volda",
    size: "Village",
    population: 1000,
    description: "Some description",
  },
];

type CityPageProps = {
  citydata: (data: cityType[]) => void;
};

const CitysPage: React.FC<CityPageProps> = ({ citydata }) => {
  const [cityName, setCityName] = useState<string>("");
  const [cityList, setCityList] = useState<cityType[]>(proxyCity);
  const [cityFilter, setCityFilter] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCityName(event.target.value);
  }

  const searchByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value.length > 1
      ? setCityFilter(event.target.value)
      : setCityFilter("");
  };

  function addCityToTheList(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();
    if (cityName.length > 2) {
      fetch("http://localhost:3000/city", {
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
          console.warn(results);
          console.warn(typeof results);
        })
        .catch((e) => console.warn(e));
      // setCityList([
      //   ...cityList,
      //   { name: cityName, region: "Volda", size: "Village", population: 1000 },
      // ]);
      setCityName("");
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/city", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((results) => {
        setCityList(results);
      })
      .catch((e) => console.warn(e));
  }, []);

  useEffect(() => {
    citydata(cityList);
  }, [cityList, citydata]);

  const listOfCitys = cityList
    .filter((filter) =>
      filter.name.toLocaleLowerCase().includes(cityFilter.toLocaleLowerCase())
    )
    .map((city, index) => (
      <Link to={`/city/${index}`} key={index + city.name}>
        <CityCard city={city} key={index + city.name} />
      </Link>
    ));

  return (
    <div className="m-2">
      <ModalWindow title={"Add new city"} />
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
      <div className="grid grid-cols-4 gap-4">{listOfCitys}</div>
    </div>
  );
};
export default CitysPage;
