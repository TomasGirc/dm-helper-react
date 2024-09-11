import React from "react";
import { npcType } from "src/entities/types";

const ListCompare = ({ data }: { data: npcType[] }) => {
  return data.map((npc) => <p>NPC: {npc.name}</p>);
};

export default ListCompare;
