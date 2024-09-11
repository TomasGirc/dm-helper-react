"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteLocation, fetchLocations } from "src/api/locations";
import { locationType } from "src/entities/types";
import { ButtonComponent } from "../ux/ButtonComponent";
import Link from "next/link";

const LocationListComponent = () => {
  const queryClient = useQueryClient();
  const { data: locations, isLoading } = useQuery({
    queryFn: () => fetchLocations(),
    queryKey: ["locationsList"],
  });

  const { mutateAsync: deleteLocationMutation } = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locationsList"] });
    },
  });

  if (isLoading) {
    return <p>...Loading</p>;
  }

  const locationList = locations?.map((location: locationType, index) => (
    <Link href={`/location/${location._id}`} key={index}>
      <div className="grid grid-cols-2 gap-4">
        <div className="mr-[12px]">{location.name}</div>
        <div>
          <ButtonComponent
            children={"Delete"}
            onClick={() => deleteLocationMutation(location._id || "")}
          ></ButtonComponent>
        </div>
      </div>
    </Link>
  ));

  return <>{locationList}</>;
};

export default LocationListComponent;
