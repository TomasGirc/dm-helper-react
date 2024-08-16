"use client";
import * as React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "src/api/items";
import { keywordsType, requirementsType } from "src/entities/types";
import LabelComponent from "../ux/LabelComponent";
import {
  itemTypeProxy,
  keywordProxy,
  rarityProxy,
} from "src/constants/proxyData";
import MultiSelectDropdown from "../ux/MultiSelectDropdown";
import MultiOptionDropdown from "../ux/MultiOptionDropdown";
import { ButtonComponent } from "../ux/ButtonComponent";

export default function ItemModal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const [name, setName] = React.useState<string>("");
  const [rarity, setRarity] = React.useState<string>("");
  const [type, setType] = React.useState<string>(itemTypeProxy[0]);
  const [keywords, setKeywords] = React.useState<keywordsType[]>([]);
  const [requirements, setRequirements] = React.useState<requirementsType[]>(
    []
  );
  const [price, setPrice] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>("");

  const { mutateAsync: addItemMutation } = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
      setShowModal(false);
      setName("");
      setRarity("");
      setType("");
      setKeywords([]);
      setRequirements([]);
      setPrice(0);
      setDescription("");
    },
  });

  const addItemToTheList = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    addItemMutation({
      name: name,
      rarity: rarity,
      type: type,
      keywords: keywords,
      requirements: requirements,
      price: price,
      description: description,
    });
  };

  return (
    <div className="p-[24px]">
      <form onSubmit={addItemToTheList}>
        <div className="grid gap-6 mb-6  md:grid-cols-2">
          <div>
            <LabelComponent text="Item name" />
            <input
              type="text"
              id="name"
              className="input-style"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <LabelComponent text="Rarity" />
            <select id="regions" className="input-style">
              {rarityProxy.map((v) => (
                <option value={v} onClick={() => setRarity(v)}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <LabelComponent text="Price" />
            <input
              type="number"
              id="price-input"
              className="input-style"
              placeholder={price.toString()}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <LabelComponent text="Keywords" />
            <MultiSelectDropdown
              formFieldName={"countries"}
              options={keywordProxy}
              onChange={(selectedOptions) => {
                const keywordMap: keywordsType[] = selectedOptions.map(
                  (option) => {
                    return { name: option };
                  }
                );
                setKeywords(keywordMap);
              }}
              prompt="Select one or more keywords"
            />
          </div>
          <div>
            <LabelComponent text="Type" />
            <select id="itemType" className="input-style">
              {itemTypeProxy.map((v) => (
                <option value={v} onClick={() => setType(v)}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="pb-[24px]">
          <LabelComponent text="Requirements" />
          <MultiOptionDropdown
            onSet={(selectedOptions: requirementsType[]) => {
              setRequirements(selectedOptions);
            }}
          />
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
        <ButtonComponent type="submit">Submit</ButtonComponent>
      </form>
    </div>
  );
}
