import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteNpc } from "src/api/npc";
import { npcType } from "src/entities/types";
import { ButtonComponent } from "../ux/ButtonComponent";

const CardNpcComponent = ({ data }: { data: npcType }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteNpcMutation } = useMutation({
    mutationFn: deleteNpc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["npcsList"] });
    },
  });

  return (
    <>
      <div>
        <img
          src="https://img.favpng.com/20/1/21/shadow-person-dungeons-dragons-silhouette-art-png-favpng-Nb7vyri0znQNmtcfkVUzgHbCj.jpg"
          className="w-[120px]"
        ></img>
        <div>
          {data.region.map((value, index) => (
            <div key={index}>
              <p>{value.name}</p>
            </div>
          ))}
        </div>
        <div>{data.name}</div>
        <div>{data.description}</div>
        <ButtonComponent onClick={() => deleteNpcMutation(data._id || "")}>
          Delete
        </ButtonComponent>
      </div>
    </>
  );
};

export default CardNpcComponent;
