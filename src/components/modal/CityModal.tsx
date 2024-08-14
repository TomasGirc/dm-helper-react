import React from "react";
import { ButtonComponent } from "../button/ButtonComponent";
import MultiSelectDropdown from "../uxComponents/MultiSelectDropdown";

const COUNTRIES = [
  "Austria",
  "Belgium",
  "Croatia",
  "Bulgaria",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Ukraine",
];

const CityModal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = React.useState<string>("");

  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 p-[24px] md:grid-cols-2">
          <div>
            <label
              htmlFor="city_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City name
            </label>
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
            <MultiSelectDropdown
              formFieldName={"countries"}
              options={COUNTRIES}
              onChange={(selectedCountries) => {
                console.debug("selectedCountries", selectedCountries);
              }}
              prompt="Select one or more countries"
            />
          </div>
        </div>
      </form>
      <ButtonComponent onClick={() => setShowModal(false)}>
        Close
      </ButtonComponent>
    </>
  );
};

export default CityModal;
