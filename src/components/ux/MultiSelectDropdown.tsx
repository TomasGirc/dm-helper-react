"use client";

import { useState } from "react";
import ClickOutside from "../helpers/ClickOutside";

export default function MultiSelectDropdown({
  formFieldName,
  options,
  onChange,
  prompt = "Select one or more options",
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
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

        <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform inline-flex border rounded px-5 py-2">
          {prompt}
          {selectedOptions}
          {selectedOptions.length > 0 && (
            <span className="ml-1 text-blue-500">{`(${selectedOptions.length} selected)`}</span>
          )}
        </div>

        <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60 overflow-y-scroll">
          <ul>
            {options.map((option) => {
              return (
                <li key={option}>
                  <label
                    className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}
                  >
                    <input
                      type="checkbox"
                      name={formFieldName}
                      value={option}
                      className="cursor-pointer"
                      onChange={handleChange}
                    />
                    <span className="ml-1">{option}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </label>
    </div>
  );
}
