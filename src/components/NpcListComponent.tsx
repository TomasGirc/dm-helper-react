"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteNpc, fetchNpc } from "src/api/npc";
import { npcType } from "src/entities/types";
import { ButtonComponent } from "./ux/ButtonComponent";

const NpcListComponent = () => {
  const queryClient = useQueryClient();
  const { data: npc, isLoading } = useQuery({
    queryFn: () => fetchNpc(),
    queryKey: ["npcssList"],
  });

  const { mutateAsync: deleteLNpcMutation } = useMutation({
    mutationFn: deleteNpc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["npcssList"] });
    },
  });

  if (isLoading) {
    return <p>...Loading</p>;
  }

  const npcList = npc?.map((npc: npcType, index) => (
    <div key={index} className="flex flex-col">
      {npc.name}
      <p>{npc.description}</p>
      {npc.locations.map((value, index) => (
        <p className="ml-[12px]" key={index}>
          {value.name}
        </p>
      ))}
      {npc.region.map((value, index) => (
        <p className="ml-[12px]" key={index}>
          {value.name}
        </p>
      ))}
      {npc.quest.map((value, index) => (
        <p className="ml-[12px]" key={index}>
          {value.name}
        </p>
      ))}
      <div>
        <ButtonComponent
          children={"Delete"}
          onClick={() => deleteLNpcMutation(npc._id || "")}
        ></ButtonComponent>
      </div>
    </div>
  ));

  return <div>{npcList}</div>;
};

export default NpcListComponent;
