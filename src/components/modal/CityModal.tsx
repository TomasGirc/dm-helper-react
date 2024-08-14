import React from "react";
import { ButtonComponent } from "../button/ButtonComponent";

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
  { id: 4, label: "Option 4" },
];

const CityModal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = React.useState<string>("");
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleSelect = (event) => {
    const selectedValue = parseInt(event.target.value);
    if (selectedOptions.includes(selectedValue)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== selectedValue));
    } else {
      setSelectedOptions([...selectedOptions, selectedValue]);
    }
  };

  const getLabelById = (id) => {
    const option = options.find((opt) => opt.id === id);
    return option ? option.label : "";
  };
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
            <label
              htmlFor="region"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              multiple
              value={selectedOptions}
              onChange={handleSelect}
              className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Selected Options:</h3>
        <div className="mt-2 space-y-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((id) => (
              <div
                key={id}
                className="px-4 py-2 bg-blue-100 rounded-md text-blue-800"
              >
                {getLabelById(id)}
              </div>
            ))
          ) : (
            <p>No options selected.</p>
          )}
        </div>
      </div>
      <ButtonComponent onClick={() => setShowModal(false)}>
        Close
      </ButtonComponent>
    </>
  );
};

export default CityModal;
