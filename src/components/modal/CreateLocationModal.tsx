import React from "react";
import { locationType, regionType } from "src/entities/types";
import LabelComponent from "../ux/LabelComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLocation } from "src/api/locations";
import { ButtonComponent } from "../ux/ButtonComponent";

const CreateLocationModal = ({
  setShowModal,
  data,
  region,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: locationType;
  region: regionType;
}) => {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  // const [npc, setNpc] = React.useState<npcType[]>(data.npc);
  // const [quest, setQuest] = React.useState<questType[]>(data.quest);
  // const [comments, setComment] = React.useState<commentType[]>(data.comment);

  const { mutateAsync: addLocationMutation, data: locationData } = useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      queryClient.invalidateQueries(["regions"]);
      setShowModal(false);
      setName("");
      setDescription("");
    },
  });

  const addLocationToTheList = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    addLocationMutation({
      name,
      description,
      npc: [],
      top: data.top,
      left: data.left,
      image: "",
      quest: [],
      region: region._id || "",
      comment: [],
    });
  };

  return (
    <div className="p-[24px]">
      <form onSubmit={addLocationToTheList}>
        <header>
          <legend>Create location</legend>
        </header>
        <div className="grid gap-6 mb-6  md:grid-cols-2">
          <div>
            <LabelComponent text="Location name" />
            <input
              type="text"
              id="location_name"
              className="input-style"
              placeholder="Location name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            {region.name} {region._id}
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
            required
          ></textarea>
        </div>
        <div className="flex justify-end ">
          <ButtonComponent type="submit">Submit</ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default CreateLocationModal;
