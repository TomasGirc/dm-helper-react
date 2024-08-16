"use client";

import { useState } from "react";
import { ButtonComponent } from "./ButtonComponent";
import { requirementProxy } from "src/constants/proxyData";
import { requirementsType } from "src/entities/types";

const MultiOptionDropdown = ({
  onSet,
}: {
  onSet: (selectedOptions: requirementsType[]) => void;
}) => {
  const [requirement, setRequirement] = useState<string>(requirementProxy[0]);
  const [requirementValue, setValue] = useState<number>(0);
  const [selection, setSelection] = useState<requirementsType[]>([]);

  const handleRequirementSubmit = (
    name: string,
    value: number,
    add: boolean
  ) => {
    let Arr: requirementsType[] = selection;
    const option: requirementsType = {
      name: name,
      value: value,
    };
    if (add) {
      if (!Arr.find((v) => v.name === option.name) || name.length < 1) {
        Arr.push(option);
        setSelection(Arr.slice());
      }
    } else {
      Arr = Arr.filter(function (el) {
        return el.name != option.name;
      });
      setSelection(Arr);
    }
    onSet(Arr);
  };

  return (
    <>
      <div className="grid grid-flow-row gap-3 grid-cols-5 col-span-2">
        <div className="col-span-2">
          <select id="requirements" className="input-style">
            {requirementProxy.map((v) => (
              <option value={v} onClick={() => setRequirement(v)}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <input
          type="number"
          id="population-input"
          className="input-style col-span-2"
          placeholder={requirementValue.toString()}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <ButtonComponent
          onClick={() =>
            handleRequirementSubmit(requirement, requirementValue, true)
          }
        >
          +
        </ButtonComponent>
      </div>
      <div>
        {selection?.map((v, index) => {
          return (
            <div>
              <div
                key={index + "-option"}
                className="grid grid-flow-row gap-3 grid-cols-5 col-span-2"
              >
                <div className="col-span-2 content-center">{v.name}</div>
                <div className="col-span-2 content-center">{v.value}</div>
                <ButtonComponent
                  colorBg="bg-white"
                  colorTxt="text-red-500"
                  border={false}
                  onClick={() =>
                    handleRequirementSubmit(v.name, v.value, false)
                  }
                >
                  x
                </ButtonComponent>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MultiOptionDropdown;
