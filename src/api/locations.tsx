import { requestLocations } from "src/constants/requestInfo";
import { locationType } from "src/entities/types";

export const fetchLocations = async (): Promise<locationType[]> => {
  const response = await fetch(requestLocations, {
    method: "GET",
  });
  return await response.json();
};

export const fetchSingleLocation = async (
  id: string
): Promise<locationType> => {
  const response = await fetch(`${requestLocations}/${id}`, {
    method: "GET",
  });
  return await response.json();
};

export const deleteLocation = async (data: string) => {
  await fetch(`${requestLocations + "/" + data}`, {
    method: "DELETE",
  }).finally(() => fetchLocations());
  return;
};

export const addLocation = async (data: locationType) => {
  await fetch(requestLocations, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .catch((e) => {
      console.error("Add region throw", e);
    })
    .finally(() => fetchLocations());
};

export const updateLocation = async ({
  id,
  data,
}: {
  id: string;
  data: locationType;
}) => {
  await fetch(`${requestLocations}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .catch((e) => {
      console.error("Update region throw", e);
    })
    .finally(() => fetchLocations());
};
