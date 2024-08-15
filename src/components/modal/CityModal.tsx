import React from "react";
import { ButtonComponent } from "../ux/ButtonComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCitys } from "src/api/citys";
import { citySize } from "src/entities/types";
import { regionProxy, sizeProxy } from "src/constants/proxyData";
import LabelComponent from "../ux/labelComponent";

const CityModal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState<string>("");
  const [region, setRegion] = React.useState<string>(regionProxy[0].name);
  const [size, setSize] = React.useState<citySize>("Village");
  const [population, setPopulation] = React.useState<number>(100);
  const [description, setDescription] = React.useState<string>("");

  const { mutateAsync: addCityMutation } = useMutation({
    mutationFn: addCitys,
    onSuccess: () => {
      queryClient.invalidateQueries(["citys"]);
      setShowModal(false);
      setName("");
      setRegion(regionProxy[0].name);
      setSize("Village");
      setPopulation(10);
      setDescription("");
    },
  });

  const addCityToTheList = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    addCityMutation({
      name: name,
      region: region,
      size: size,
      population: population,
      description: description,
    });
  };

  return (
    <div className="p-[24px]">
      <form onSubmit={addCityToTheList}>
        <div className="grid gap-6 mb-6  md:grid-cols-2">
          <div>
            <LabelComponent text="City name" />
            <input
              type="text"
              id="city_name"
              className="input-style"
              placeholder="City name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <LabelComponent text="Select a region" />
            <select id="regions" className="input-style">
              {regionProxy.map((v) => (
                <option value={v.name} onClick={() => setRegion(v.name)}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <LabelComponent text="Select type" />
            <select id="regions" className="input-style">
              {sizeProxy.map((v) => (
                <option value={v} onChange={() => setSize(v)}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <LabelComponent text="Population size" />
            <input
              type="number"
              id="population-input"
              className="input-style"
              placeholder="100"
              onChange={(e) => setPopulation(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="pb-[24px]">
          <LabelComponent text="Add description" />
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end ">
          <ButtonComponent type="submit">Submit</ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default CityModal;
