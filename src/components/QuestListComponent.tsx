"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteQuest, fetchQuest } from "src/api/quest";
import { ButtonComponent } from "./ux/ButtonComponent";
import { questType } from "src/entities/types";

const QuestListComponent = () => {
  const queryClient = useQueryClient();
  const { data: quest, isLoading } = useQuery({
    queryFn: () => fetchQuest(),
    queryKey: ["questList"],
  });

  const { mutateAsync: deleteQuestMutation } = useMutation({
    mutationFn: deleteQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questList"] });
    },
  });

  if (isLoading) {
    return <p>...Loading</p>;
  }

  const questList = quest?.map((quest: questType, index) => (
    <div key={index} className="flex flex-col">
      <p>{quest.name}</p>
      <p>{quest.description}</p>
      {quest.locations.map((location, index) => (
        <p className="ml-[12px]" key={index}>
          {location.name}
        </p>
      ))}
      <div>
        <ButtonComponent
          children={"Delete"}
          onClick={() => deleteQuestMutation(quest._id || "")}
        ></ButtonComponent>
      </div>
    </div>
  ));

  return <>{questList}</>;
};

export default QuestListComponent;
