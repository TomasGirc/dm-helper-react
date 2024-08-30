"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchNpc } from "src/api/npc";
import { npcType } from "src/entities/types";
import Link from "next/link";
import CardNpcComponent from "../card/CardNpcComponent";

const NpcListComponent = () => {
  const { data: npc, isLoading } = useQuery({
    queryFn: () => fetchNpc(),
    queryKey: ["npcsList"],
  });

  if (isLoading) {
    return <p>...Loading</p>;
  }

  const npcList = npc?.map((npc: npcType, index) => (
    <Link href={`/npc/${npc._id}`} key={index}>
      <CardNpcComponent data={npc} />
    </Link>
  ));

  return <div className="grid grid-cols-4 gap-4">{npcList}</div>;
};

export default NpcListComponent;
