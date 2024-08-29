import { requestQuests } from "src/constants/requestInfo";
import { questType } from "src/entities/types";

export const fetchQuest = async (): Promise<questType[]> => {
  const response = await fetch(requestQuests, {
    method: "GET",
  });
  return await response.json();
};

export const fetchSingleQuest = async (id: string): Promise<questType> => {
  const response = await fetch(`${requestQuests}/${id}`, {
    method: "GET",
  });
  return await response.json();
};

export const deleteQuest = async (data: string) => {
  await fetch(`${requestQuests + "/" + data}`, {
    method: "DELETE",
  }).finally(() => fetchQuest());
  return;
};

export const addQuest = async (data: questType) => {
  await fetch(requestQuests, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .catch((e) => {
      console.error("Add quest throw", e);
    })
    .finally(() => fetchQuest());
};
