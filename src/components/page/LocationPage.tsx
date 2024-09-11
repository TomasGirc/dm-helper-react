import React, { useState } from "react";
import { commentType, locationType } from "src/entities/types";
import LabelComponent from "../ux/LabelComponent";
import CommentComponent from "../ux/CommentComponent";
import ListCompare from "../modal/ListCompare";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLocation } from "src/api/locations";

const LocationPage = ({ data }: { data: locationType }) => {
  const [name, setName] = useState<string>(data.name);
  const [description, setDescription] = useState<string>(data.description);
  const queryClient = useQueryClient();
  const { mutateAsync: updateLocationMutation } = useMutation({
    mutationFn: updateLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });

  return (
    <>
      <div className="grid gap-6 mb-6  md:grid-cols-2">
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
      </div>
      <div>{data?.npc && <ListCompare data={data?.npc} />}</div>
      <div>
        {data?.quest && data?.quest.map((quest) => <p>Quest: {quest.name}</p>)}
      </div>
      {data?.region && (
        <div>
          <p>Region: {data?.region.name}</p>
        </div>
      )}
      <div>
        {data?.comment && (
          <CommentComponent
            commentList={data?.comment}
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
    </>
  );
};

export default LocationPage;
