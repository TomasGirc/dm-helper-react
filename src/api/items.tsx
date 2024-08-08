import { requestItems } from "src/constants/requestInfo";
import { itemType } from "src/entities/types";

export const fetchItems = async (): Promise<itemType[]> => {
  const response = await fetch(requestItems, {
    method: "GET",
  });
  return await response.json();
};

export const deleteItem = async (data: number) => {
  await fetch(`${requestItems + "/" + data}`, {
    method: "DELETE",
  }).finally(() => fetchItems());
  return;
};

export const addItem = async (data: itemType) => {
  await fetch(requestItems, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .catch((e) => {
      console.error("Add item throw", e);
    })
    .finally(() => fetchItems());
};
