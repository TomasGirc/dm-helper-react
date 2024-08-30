"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchSingleNpc } from "src/api/npc";

const NpcDetails = ({ params }: { params: { npcId: string } }) => {
  const { data: npc, isLoading } = useQuery({
    queryFn: () => fetchSingleNpc(params.npcId),
    queryKey: ["npc"],
  });
  if (isLoading || !npc) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>
          <h1 className="font-bold text-lg">{npc.name}</h1>
        </div>
        <div>
          <img
            src="https://img.favpng.com/20/1/21/shadow-person-dungeons-dragons-silhouette-art-png-favpng-Nb7vyri0znQNmtcfkVUzgHbCj.jpg"
            className="w-[360px]"
          ></img>
        </div>
      </div>
    );
  }
};

export default NpcDetails;
