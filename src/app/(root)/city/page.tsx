"use client";

import { useState } from "react";
import CityCard from "src/components/CityCard";
import { searchByName } from "src/helpers";
import { useQuery } from "@tanstack/react-query";
import { fetchCitys } from "src/api/citys";
import CityModal from "src/components/modal/CityModal";
import ModalComponent from "src/components/modal/ModalComponent";
import Link from "next/link";

const City = () => {
  const [showModal, setShowModal] = useState(false);
  const [cityFilter, setCityFilter] = useState("");

  const { data: city, isLoading } = useQuery({
    queryFn: () => fetchCitys(),
    queryKey: ["citys"],
    staleTime: Infinity,
  });

  const listOfCitys = city
    ?.filter((filter) =>
      filter.name.toLocaleLowerCase().includes(cityFilter.toLocaleLowerCase())
    )
    .map((city, index) => (
      <Link href={`/city/${city._id}`}>
        <CityCard city={city} key={index + city.name} />
      </Link>
    ));

  return (
    <>
      <div className="m-2">
        <div className="flex mb-[12px] w-full justify-between">
          <div>
            <input
              placeholder="Search for city"
              type="text"
              id="new-todo-input"
              className="input-style"
              name="text"
              autoComplete="off"
              onChange={(e) => setCityFilter(searchByName(e.target.value))}
            />
          </div>
          <div>
            <ModalComponent
              title="+"
              colorBg="bg-blue-500"
              colorTxt="text-white"
              modalState={showModal}
              setShowModal={setShowModal}
              content={<CityModal setShowModal={setShowModal}></CityModal>}
            />
          </div>
        </div>
        {!isLoading ? (
          <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-4">
            {listOfCitys}
          </div>
        ) : (
          <div className="m-2">Loading</div>
        )}
      </div>
    </>
  );
};
export default City;
