"use client";

import { ChangeEvent, useState } from "react";
import ClickOutside from "../helpers/ClickOutside";

export default function MultiSelectDropdown({
  formFieldName,
  options,
  onChange,
  prompt = "Select one or more options",
  searchable = false,
}: {
  formFieldName: string;
  options: string[];
  onChange: (selectedOptions: string[]) => void;
  prompt: string;
  searchable?: boolean;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[] | []>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const selectedOptionSet = new Set(selectedOptions);

    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  const handleClickOutside = () => {
    setIsChecked(false);
  };

  const ref = ClickOutside(handleClickOutside);

  return (
    <div ref={ref}>
      <label className="relative">
        <input
          type="checkbox"
          className="hidden peer"
          checked={isChecked}
          onChange={checkHandler}
        />

        <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform inline-flex input-style">
          {selectedOptions.length > 0 ? (
            <span className="ml-1 text-blue-500">{`${selectedOptions}`}</span>
          ) : (
            <p className="w-full">{prompt}</p>
          )}
        </div>

        <div className="z-10  bg-white rounded-lg shadow w-full dark:bg-gray-700 absolute  border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto  max-h-60 overflow-y-scroll">
          {searchable && (
            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="input-group-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search user"
                  onChange={(e) => setSearchFilter(e.target.value)}
                ></input>
              </div>
            </div>
          )}

          <ul className="bg-gray-50">
            {options
              .filter((filter) =>
                filter
                  .toLocaleLowerCase()
                  .includes(searchFilter.toLocaleLowerCase())
              )
              .map((option, index) => {
                return (
                  <li key={option}>
                    <div className="flex items-center p-2 rounded hover:bg-white dark:hover:bg-gray-50">
                      <input
                        id={`${"checkbox-item-" + index + option}`}
                        type="checkbox"
                        name={formFieldName}
                        value={option}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      ></input>
                      <label
                        htmlFor={`${"checkbox-item-" + index + option}`}
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </label>
    </div>
  );
}
