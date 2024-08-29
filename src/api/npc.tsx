import { requestNpcs } from "src/constants/requestInfo";
import { npcType } from "src/entities/types";

export const fetchNpc = async (): Promise<npcType[]> => {
  const response = await fetch(requestNpcs, {
    method: "GET",
  });
  return await response.json();
};

export const fetchSingleNpc = async (id: string): Promise<npcType> => {
  const response = await fetch(`${requestNpcs}/${id}`, {
    method: "GET",
  });
  return await response.json();
};

export const deleteNpc = async (data: string) => {
  await fetch(`${requestNpcs + "/" + data}`, {
    method: "DELETE",
  }).finally(() => fetchNpc());
  return;
};

export const addNpc = async (data: npcType) => {
  await fetch(requestNpcs, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .catch((e) => {
      console.error("Add npc throw", e);
    })
    .finally(() => fetchNpc());
};
