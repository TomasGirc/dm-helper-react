import { requestCity } from "src/constants/requestInfo";
import { cityType } from "src/entities/types";

export const fetchCitys = async (): Promise<cityType[]> => {
  const response = await fetch(requestCity, {
    method: "GET",
  });
  return await response.json();
};

export const fetchSingleCity = async (id: string): Promise<cityType> => {
  const response = await fetch(`${requestCity}/${id}`, {
    method: "GET",
  });
  return await response.json();
};

export const deleteCitys = async (data: string) => {
  await fetch(`${requestCity + "/" + data}`, {
    method: "DELETE",
  }).finally(() => fetchCitys());
  return;
};

export const addCitys = async (data: cityType) => {
  await fetch(requestCity, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .catch((e) => {
      console.error("Add city throw", e);
    })
    .finally(() => fetchCitys());
};
