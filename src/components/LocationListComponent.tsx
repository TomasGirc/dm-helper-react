"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteLocation, fetchLocations } from "src/api/locations";
import { locationType } from "src/entities/types";
import { ButtonComponent } from "./ux/ButtonComponent";

const LocationListComponent = () => {
  const queryClient = useQueryClient();
  const { data: locations, isLoading } = useQuery({
    queryFn: () => fetchLocations(),
    queryKey: ["locationsList"],
  });

  const { mutateAsync: deleteLocationMutation } = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries(["locationsList"]);
    },
  });

  if (isLoading) {
    return <p>...Loading</p>;
  }
  const locationList = locations?.map((location: locationType, index) => (
    <div key={index} className="flex flex-col">
      {location.name}
      <div>
        <ButtonComponent
          children={"Delete"}
          onClick={() => deleteLocationMutation(location._id || "")}
        ></ButtonComponent>
      </div>
    </div>
  ));

  return <>{locationList}</>;
};

export default LocationListComponent;
