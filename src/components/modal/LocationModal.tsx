import React from "react";
import { commentType, locationType } from "src/entities/types";
import LabelComponent from "../ux/LabelComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteLocation,
  fetchSingleLocation,
  updateLocation,
} from "src/api/locations";
import { ButtonComponent } from "../ux/ButtonComponent";
import CommentComponent from "../ux/CommentComponent";
import ListCompare from "./ListCompare";

const LocationModal = ({
  setShowModal,
  data,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: locationType;
}) => {
  const [name, setName] = React.useState<string>(data.name || "");
  const [description, setDescription] = React.useState<string>(
    data.description || ""
  );
  const queryClient = useQueryClient();
  const { data: singleLocation, isLoading } = useQuery({
    queryFn: () => fetchSingleLocation(data._id || ""),
    queryKey: ["locations"],
  });

  const { mutateAsync: deleteLocationMutation } = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      setShowModal(false);
    },
  });

  const { mutateAsync: updateLocationMutation } = useMutation({
    mutationFn: updateLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <div className="p-[24px] max-h-[80vh] overflow-auto">
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
          {singleLocation?.npc && <ListCompare data={singleLocation?.npc} />}
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
          {singleLocation?.comment && (
            <CommentComponent
              commentList={singleLocation?.comment}
              onSubmit={(value: commentType) => (
                data.comment.push(value),
                updateLocationMutation({
                  id: data._id || "",
                  data: data,
                })
              )}
            />
          )}
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
