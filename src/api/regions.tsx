import { requestRegions } from "src/constants/requestInfo";
import { regionType } from "src/entities/types";

export const fetchRegions = async (): Promise<regionType[]> => {
  const response = await fetch(requestRegions, {
    method: "GET",
  });
  return await response.json();
};

export const fetchSingleRegion = async (id: string): Promise<regionType> => {
  const response = await fetch(`${requestRegions}/${id}`, {
    method: "GET",
  });
  return await response.json();
};

export const deleteRegion = async (data: string) => {
  await fetch(`${requestRegions + "/" + data}`, {
    method: "DELETE",
  }).finally(() => fetchRegions());
  return;
};

export const addRegion = async (data: regionType) => {
  await fetch(requestRegions, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .catch((e) => {
      console.error("Add region throw", e);
    })
    .finally(() => fetchRegions());
};

export const updateRegion = async (id: string, data: regionType) => {
  await fetch(`${requestRegions + "/" + id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
