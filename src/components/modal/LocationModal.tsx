import React from "react";
import {
  commentType,
  locationType,
  npcType,
  questType,
} from "src/entities/types";
import LabelComponent from "../ux/LabelComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteLocation, fetchSingleLocation } from "src/api/locations";
import { ButtonComponent } from "../ux/ButtonComponent";

const LocationModal = ({
  setShowModal,
  data,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: locationType;
}) => {
  const queryClient = useQueryClient();
  const { data: singleLocation, isLoading } = useQuery({
    queryFn: () => fetchSingleLocation(data._id || ""),
    queryKey: ["locations"],
  });

  const { mutateAsync: deleteLocationMutation } = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries(["locations"]);
      setShowModal(false);
    },
  });

  const [name, setName] = React.useState<string>(data.name || "");
  const [description, setDescription] = React.useState<string>(
    data.description || ""
  );
  const [npc, setNpc] = React.useState<npcType[]>(data.npc);
  const [quest, setQuest] = React.useState<questType[]>(data.quest);
  const [comments, setComment] = React.useState<commentType[]>(data.comment);

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <div className="p-[24px]">
      <form>
        <header>
          <legend>Edit location details</legend>
        </header>
        <div className="grid gap-6 mb-6  md:grid-cols-2">
          <div>
            <div>
              <LabelComponent text="Edit location name" />
              <input
                type="text"
                id="city_name"
                className="input-style"
                placeholder="City name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="pb-[24px]">
          <LabelComponent text="Add description" />
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          {singleLocation?.npc &&
            singleLocation?.npc.map((npc) => <p>NPC: {npc.name}</p>)}
        </div>
        <div>
          {singleLocation?.quest &&
            singleLocation?.quest.map((quest) => <p>Quest: {quest.name}</p>)}
        </div>
        {singleLocation?.region && (
          <div>
            <p>Region: {singleLocation?.region.name}</p>
          </div>
        )}
        <div>
          {singleLocation?.comment &&
            singleLocation?.comment.map((comments) => (
              <p>{comments.comment}</p>
            ))}
        </div>
        <div className="flex justify-end ">
          <ButtonComponent
            children={"Delete"}
            onClick={() => deleteLocationMutation(data._id || "")}
          ></ButtonComponent>
          <ButtonComponent type="submit" onClick={() => setShowModal(false)}>
            Submit
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default LocationModal;
